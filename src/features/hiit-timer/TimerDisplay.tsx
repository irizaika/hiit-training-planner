import type { HiitWorkout } from "../../models/workout";
import { TIMER_PHASE, type TimerState } from "../../models/timer";

interface TimerDisplayProps {
  workout: HiitWorkout;
  timer: TimerState;
}

export function TimerDisplay({ workout, timer }: TimerDisplayProps) {
  const exerciseName = getExerciseName(workout, timer);

  return (
    <div className="timer-display">
      <h3 className="current-exercise-name">{exerciseName}</h3>

      <strong>{String(timer.remainingSeconds).padStart(2, "0")}</strong>

      <span className="timer-unit">SECONDS</span>
      {/* <span className="timer-unit">Remaining {String(timer.totalTimeLeft).padStart(2, "0")}</span> */}
      <span className="timer-unit">Remaining {Math.floor(timer.totalTimeLeft / 60)}:{timer.totalTimeLeft % 60 < 10 ? "0" : ""}{timer.totalTimeLeft % 60}</span>
    </div>
  );
}

function getExerciseName(workout: HiitWorkout, timer: TimerState): string {
  if (timer.phase === TIMER_PHASE.COUNTDOWN) {
    return "Get ready";
  }
  if (timer.phase === TIMER_PHASE.FINISHED) {
    return "Workout complete";
  }

  if (timer.phase === TIMER_PHASE.REST) {
    return `Next: ${getNextExerciseName(workout, timer)}`;
  }

  return workout.exercises[timer.currentExercise]?.name ?? "Get ready";
}

function getNextExerciseName(workout: HiitWorkout, timer: TimerState): string {
  const nextExercise = workout.exercises[timer.currentExercise + 1];

  if (nextExercise) {
    return nextExercise.name;
  }

  if (timer.currentRound < timer.totalRounds) {
    return workout.exercises[0]?.name ?? "Next round";
  }

  return "Workout complete";
}
