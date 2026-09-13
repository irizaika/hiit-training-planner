import { useEffect, useState } from "react";
import type { HiitWorkout } from "../models/workout";
import {
  TIMER_PHASE,
  type TimerState,
} from "../models/timer";
import { playCountdownBeep } from "../utils/countdownSound";

interface UseTimerProps {
  workout: HiitWorkout;
}

export function useTimer({ workout }: UseTimerProps) {
  const [timer, setTimer] = useState<TimerState>(() =>
    createInitialTimerState(workout),
  );

  const start = () => {
    setTimer({
      phase: TIMER_PHASE.COUNTDOWN,
      previousPhase: null,
      remainingSeconds: 3,
      currentRound: 1,
      totalRounds: workout.rounds,
      currentExercise: 0,
      totalExercises: workout.exercises.length,
      totalTimeLeft:
        workout.rounds * workout.exercises.length * workout.workSeconds + 
        workout.rounds * workout.exercises.length * workout.restSeconds - workout.restSeconds
    });
  };

  const pause = () => {
    setTimer((current) => {
      if (!isResumablePhase(current.phase)) {
        return current;
      }

      return {
        ...current,
        phase: TIMER_PHASE.FREEZE,
        previousPhase: current.phase,
      };
    });
  };

  const resume = () => {
    setTimer((current) => {
      if (!current.previousPhase) {
        return current;
      }

      return {
        ...current,
        phase: current.previousPhase,
        previousPhase: null,
      };
    });
  };

  useEffect(() => {
    if (
      timer.phase === TIMER_PHASE.IDLE ||
      timer.phase === TIMER_PHASE.FREEZE ||
      timer.phase === TIMER_PHASE.FINISHED
    ) {
      return;
    }
    const intervalId = window.setInterval(() => {
      setTimer((current) => {

        const shouldDecrementTotalTime =
          current.phase === TIMER_PHASE.WORK ||
          current.phase === TIMER_PHASE.REST;

        if (current.remainingSeconds > 1) {
          return {
            ...current,
            remainingSeconds: current.remainingSeconds - 1,
            totalTimeLeft: shouldDecrementTotalTime
              ? current.totalTimeLeft - 1
              : current.totalTimeLeft,
          };
        }
        const nextState = getNextTimerState(current, workout);
        return {
          ...nextState,
          totalTimeLeft: shouldDecrementTotalTime
            ? current.totalTimeLeft - 1
            : current.totalTimeLeft,
        };
      });
    }, 1000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [timer.phase, workout]);

  useEffect(() => {
    if ( timer.remainingSeconds >= 1 && timer.remainingSeconds <= 3) {
      playCountdownBeep(timer.remainingSeconds, timer.phase);
    }
  }, [timer.remainingSeconds, timer.phase]);

  return {
    timer,
    start,
    pause,
    resume,
  };
}

function createInitialTimerState(workout: HiitWorkout): TimerState {
  return {
    phase: TIMER_PHASE.IDLE,
    previousPhase: null,
    remainingSeconds: 4,
    currentRound: 1,
    totalRounds: workout.rounds,
    currentExercise: 0,
    totalExercises: workout.exercises.length,
    totalTimeLeft:
        workout.rounds * workout.exercises.length * workout.workSeconds + 
        workout.rounds * workout.exercises.length * workout.restSeconds - workout.restSeconds
  };
}

function isResumablePhase(
  phase: TimerState["phase"],
): phase is NonNullable<TimerState["previousPhase"]> {
  return (
    phase === TIMER_PHASE.COUNTDOWN ||
    phase === TIMER_PHASE.WORK ||
    phase === TIMER_PHASE.REST
  );
}



function getNextTimerState(
  current: TimerState,
  workout: HiitWorkout,
): TimerState {
  // Countdown → first exercise
  if (current.phase === TIMER_PHASE.COUNTDOWN) {
    return {
      ...current,
      phase: TIMER_PHASE.WORK,
      remainingSeconds: workout.workSeconds,
      currentExercise: 0,
    };
  }

  // Work → rest or finished
  if (current.phase === TIMER_PHASE.WORK) {
    const isLastExercise =
      current.currentExercise >= workout.exercises.length - 1;

    const isLastRound =
      current.currentRound >= workout.rounds;

    // Last exercise of last round → finished immediately
    if (isLastExercise && isLastRound) {
      return {
        ...current,
        phase: TIMER_PHASE.FINISHED,
        remainingSeconds: 0,
      //  totalTimeLeft: 0,
      };
    }

    // Otherwise → rest
    return {
      ...current,
      phase: TIMER_PHASE.REST,
      remainingSeconds: workout.restSeconds,
    };
  }

  // Rest → next exercise or next round
  if (current.phase === TIMER_PHASE.REST) {
    const isLastExercise =
      current.currentExercise >= workout.exercises.length - 1;

    // Last exercise of current round → first exercise of next round
    if (isLastExercise) {
      return {
        ...current,
        phase: TIMER_PHASE.WORK,
        remainingSeconds: workout.workSeconds,
        currentExercise: 0,
        currentRound: current.currentRound + 1,
      };
    }

    // Otherwise → next exercise
    return {
      ...current,
      phase: TIMER_PHASE.WORK,
      remainingSeconds: workout.workSeconds,
      currentExercise: current.currentExercise + 1,
    };
  }

  return current;
}