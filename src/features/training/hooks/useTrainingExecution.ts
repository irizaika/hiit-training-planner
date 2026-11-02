import { useEffect, useReducer } from "react";
import type { TrainingWorkout, WorkoutBlock } from "../../../models/workout";

export type BlockWorkout = Extract<TrainingWorkout, { mode: "circular" | "supersets" }>;

export type TimerPurpose = "exercise" | "rest";

export interface ExecutionTimer {
  label: string;
  purpose: TimerPurpose;
  remainingSeconds: number;
  isRunning: boolean;
  completesStep?: {
    key: string;
    restSeconds?: number;
  };
}

interface ExecutionState {
  completed: Record<string, boolean>;
  timer: ExecutionTimer | null;
}

type ExecutionAction =
  | { type: "tick" }
  | { type: "toggle-completed"; key: string }
  | { type: "toggle-group"; keys: string[] }
  | { type: "start-timer"; timer: ExecutionTimer }
  | { type: "pause-timer" }
  | { type: "resume-timer" }
  | { type: "clear-timer" }
  | { type: "reset-progress" };

function executionReducer(
  state: ExecutionState,
  action: ExecutionAction,
): ExecutionState {
  switch (action.type) {
    case "tick": {
      const timer = state.timer;
      if (!timer?.isRunning) {
        return state;
      }
      if (timer.remainingSeconds > 1) {
        return {
          ...state,
          timer: { ...timer, remainingSeconds: timer.remainingSeconds - 1 },
        };
      }

      const completedStep = timer.completesStep;
      const completed = completedStep
        ? { ...state.completed, [completedStep.key]: true }
        : state.completed;
      const nextTimer: ExecutionTimer =
        completedStep?.restSeconds && completedStep.restSeconds > 0
          ? {
              label: "Rest",
              purpose: "rest",
              remainingSeconds: completedStep.restSeconds,
              isRunning: true,
            }
          : timer.completesStep
            ? { ...timer, remainingSeconds: 0, isRunning: false, completesStep: undefined }
            : { ...timer, remainingSeconds: 0, isRunning: false };

      return { completed, timer: nextTimer };
    }
    case "toggle-completed":
      return {
        ...state,
        completed: {
          ...state.completed,
          [action.key]: !state.completed[action.key],
        },
      };
    case "toggle-group": {
      const shouldComplete = !action.keys.every(
        (key) => state.completed[key],
      );
      const completed = { ...state.completed };
      for (const key of action.keys) {
        completed[key] = shouldComplete;
      }
      return { ...state, completed };
    }
    case "start-timer":
      return { ...state, timer: action.timer };
    case "pause-timer":
      return state.timer
        ? { ...state, timer: { ...state.timer, isRunning: false } }
        : state;
    case "resume-timer":
      return state.timer && state.timer.remainingSeconds > 0
        ? { ...state, timer: { ...state.timer, isRunning: true } }
        : state;
    case "clear-timer":
      return { ...state, timer: null };
    case "reset-progress":
      return { ...state, completed: {}, timer:null };
  }
}

export function useTrainingExecution(workout: TrainingWorkout) {
  const [state, dispatch] = useReducer(executionReducer, {
    completed: {},
    timer: null,
  });
  const { completed, timer } = state;
  const setStepKeys = getSetStepKeys(workout);
  const exerciseKeys = getExerciseKeys(workout, setStepKeys);
  const completedCount = exerciseKeys.filter((key) => completed[key]).length;
  const currentStepKey = exerciseKeys.find((key) => !completed[key]);
  const progress =
    exerciseKeys.length > 0
      ? Math.round((completedCount / exerciseKeys.length) * 100)
      : 0;

  useEffect(() => {
    if (!timer?.isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [timer?.isRunning]);

  const startTimer = (
    label: string,
    seconds: number,
    purpose: TimerPurpose = "rest",
  ) => {
    if (seconds <= 0) {
      return;
    }

    dispatch({
      type: "start-timer",
      timer: {
        label,
        purpose,
        remainingSeconds: seconds,
        isRunning: true,
      },
    });
  };

  const startExerciseTimer = (
    label: string,
    seconds: number,
    stepKey: string,
    restSeconds?: number,
  ) => {
    if (seconds <= 0) {
      return;
    }

    dispatch({
      type: "start-timer",
      timer: {
        label,
        purpose: "exercise",
        remainingSeconds: seconds,
        isRunning: true,
        completesStep: { key: stepKey, restSeconds },
      },
    });
  };

  const toggleCompleted = (key: string) => {
    dispatch({ type: "toggle-completed", key });
  };

  const toggleGroupCompleted = (keys: string[]) => {
    dispatch({ type: "toggle-group", keys });
  };

  const pauseTimer = () => {
    dispatch({ type: "pause-timer" });
  };

  const resumeTimer = () => {
    dispatch({ type: "resume-timer" });
  };

  return {
    completed,
    completedCount,
    exerciseKeys,
    setStepKeys,
    currentStepKey,
    // getNextIncompleteKey: (afterKey?: string) => {
    //   const startIndex = afterKey ? exerciseKeys.indexOf(afterKey) + 1 : 0;
    //   return exerciseKeys
    //     .slice(startIndex)
    //     .find((key) => !completed[key]);
    // },
    progress,
    timer,
    startTimer,
    startExerciseTimer,
    toggleCompleted,
    toggleGroupCompleted,
    resetProgress: () => dispatch({ type: "reset-progress" }),
    pauseTimer,
    resumeTimer,
    clearTimer: () => dispatch({ type: "clear-timer" }),
    getBlockKeys,
  };
}

export type TrainingExecutionState = ReturnType<typeof useTrainingExecution>;

function getSetStepKeys(workout: TrainingWorkout): string[][] {
  if (workout.mode !== "sets") {
    return [];
  }

  return workout.exercises.map((exercise, exerciseIndex) =>
    Array.from(
      { length: exercise.sets },
      (_, setIndex) => `set:${exerciseIndex}:${setIndex}`,
    ),
  );
}

function getExerciseKeys(
  workout: TrainingWorkout,
  setStepKeys: string[][],
): string[] {
  if (workout.mode === "sets") {
    return setStepKeys.flat();
  }

  return workout.blocks.flatMap((block, blockIndex) =>
    Array.from({ length: block.repeatCount }, (_, repeatIndex) =>
      block.exercises.map(
        (_, exerciseIndex) =>
          `block:${blockIndex}:repeat:${repeatIndex}:exercise:${exerciseIndex}`,
      ),
    ).flat(),
  );
}

function getBlockKeys(block: WorkoutBlock, blockIndex: number): string[] {
  return Array.from({ length: block.repeatCount }, (_, repeatIndex) =>
    getRepeatKeys(block, blockIndex, repeatIndex),
  ).flat();
}

function getRepeatKeys(
  block: WorkoutBlock,
  blockIndex: number,
  repeatIndex: number,
): string[] {
  return block.exercises.map(
    (_, exerciseIndex) =>
      `block:${blockIndex}:repeat:${repeatIndex}:exercise:${exerciseIndex}`,
  );
}
