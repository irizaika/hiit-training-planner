import type { HiitWorkout } from "../../models/workout";
import { TIMER_PHASE, type TimerState } from "../../models/timer";
import { formatTime, formatTimePadStart } from "../../utils/time";

interface TimerDisplayProps {
  workout: HiitWorkout;
  timer: TimerState;
}

export function TimerDisplay({ workout, timer }: TimerDisplayProps) {
  const exerciseName = getExerciseName(workout, timer);

  return (
    <div className="timer-display">
      <h3 className="current-exercise-name">{exerciseName}</h3>

      <strong>{formatTimePadStart(timer.remainingSeconds)}</strong>

      <span className="timer-unit">SECONDS</span>

      <span className="timer-unit">
        Remaining {formatTime(timer.totalTimeLeft)}
      </span>
    </div>
  );
}

function getExerciseName(workout: HiitWorkout, timer: TimerState): string {
  if (timer.phase === TIMER_PHASE.IDLE) {
    return "Get ready";
  }

  if (timer.phase === TIMER_PHASE.COUNTDOWN ||
    (timer.phase === TIMER_PHASE.FREEZE &&
      timer.previousPhase === TIMER_PHASE.COUNTDOWN)
  ) {
    return `Get ready, Next: ${workout.exercises[0]?.name ?? "Workout"}`;
  }

  if (timer.phase === TIMER_PHASE.FREEZE &&
    (timer.previousPhase === TIMER_PHASE.REST || timer.previousPhase === TIMER_PHASE.ROUND_REST)) {
    return `Paused, Next: ${getNextExerciseName(workout, timer)}`;
  }

  if (timer.phase === TIMER_PHASE.FREEZE &&
    timer.previousPhase === TIMER_PHASE.WORK) {
    return `Paused, ${workout.exercises[timer.currentExercise]?.name ?? "Workout"}`;
  }

  if (timer.phase === TIMER_PHASE.FINISHED) {
    return "Workout complete";
  }

  if (timer.phase === TIMER_PHASE.REST || timer.phase === TIMER_PHASE.ROUND_REST) {
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
