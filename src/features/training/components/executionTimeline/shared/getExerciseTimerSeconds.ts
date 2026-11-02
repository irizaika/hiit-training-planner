import type { WorkoutExercise } from "../../../../../models/workout";

export function getExerciseTimerSeconds(
  exercise: WorkoutExercise,
): number | undefined {
  if (exercise.timer?.enabled && exercise.timer.seconds > 0) {
    return exercise.timer.seconds;
  }

  if (
    exercise.target?.type === "duration" &&
    exercise.target.seconds > 0
  ) {
    return exercise.target.seconds;
  }

  return undefined;
}
