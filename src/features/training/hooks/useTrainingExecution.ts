import { useEffect, useState } from "react";
import type { TrainingWorkout, WorkoutBlock } from "../../../models/workout";

export type BlockWorkout = Extract<TrainingWorkout, { mode: "circular" | "supersets" }>;

export interface ExecutionTimer {
  label: string;
  remainingSeconds: number;
  isRunning: boolean;
}

export function useTrainingExecution(workout: TrainingWorkout) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [timer, setTimer] = useState<ExecutionTimer | null>(null);
  const exerciseKeys = getExerciseKeys(workout);
  const completedCount = exerciseKeys.filter((key) => completed[key]).length;
  const progress =
    exerciseKeys.length > 0
      ? Math.round((completedCount / exerciseKeys.length) * 100)
      : 0;

  useEffect(() => {
    if (!timer?.isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimer((current) => {
        if (!current || !current.isRunning) {
          return current;
        }

        if (current.remainingSeconds <= 1) {
          return { ...current, remainingSeconds: 0, isRunning: false };
        }

        return { ...current, remainingSeconds: current.remainingSeconds - 1 };
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [timer?.isRunning]);

  const startTimer = (label: string, seconds: number) => {
    if (seconds <= 0) {
      return;
    }

    setTimer({ label, remainingSeconds: seconds, isRunning: true });
  };

  const toggleCompleted = (key: string) => {
    setCompleted((current) => ({ ...current, [key]: !current[key] }));
  };

  const toggleGroupCompleted = (keys: string[]) => {
    setCompleted((current) => {
      const shouldComplete = !keys.every((key) => current[key]);
      const next = { ...current };

      for (const key of keys) {
        next[key] = shouldComplete;
      }

      return next;
    });
  };

  const pauseTimer = () => {
    setTimer((current) =>
      current ? { ...current, isRunning: false } : current,
    );
  };

  const resumeTimer = () => {
    setTimer((current) =>
      current && current.remainingSeconds > 0
        ? { ...current, isRunning: true }
        : current,
    );
  };

  return {
    completed,
    completedCount,
    exerciseKeys,
    progress,
    timer,
    startTimer,
    toggleCompleted,
    toggleGroupCompleted,
    resetProgress: () => setCompleted({}),
    pauseTimer,
    resumeTimer,
    clearTimer: () => setTimer(null),
    getBlockKeys,
  };
}

function getExerciseKeys(workout: TrainingWorkout): string[] {
  if (workout.mode === "sets") {
    return workout.exercises.flatMap((exercise, exerciseIndex) =>
      Array.from(
        { length: exercise.sets },
        (_, setIndex) => `set:${exerciseIndex}:${setIndex}`,
      ),
    );
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

