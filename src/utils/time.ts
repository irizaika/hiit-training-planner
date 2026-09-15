import { type HiitWorkout } from "../models/workout";
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


export function formatTimePadStart(seconds: number): string {
    return String(seconds).padStart(2, "0");
}


export function calculateTotalTime(workout: HiitWorkout): number {
  const totalWorkTime =
    workout.rounds *
    workout.exercises.length *
    workout.workSeconds;

  const exerciseRestCount =
    workout.rounds * Math.max(workout.exercises.length - 1, 0);

  const exerciseRestTime = workout.restEnabled
    ? exerciseRestCount * workout.restSeconds
    : 0;

  const roundRestCount = Math.max(workout.rounds - 1, 0);

  const roundRestTime = workout.roundRestEnabled
    ? roundRestCount * workout.roundRestSeconds
    : workout.restEnabled ? workout.restSeconds * roundRestCount : 0;

  return totalWorkTime + exerciseRestTime + roundRestTime;
}