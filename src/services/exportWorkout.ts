import type {  Workouts, WorkoutType } from "../models/workout";

export function exportWorkouts(workouts: Workouts) {
  downloadWorkouts(workouts);
}

export function exportWorkout<T extends WorkoutType>(
  workouts: Workouts[T],
  workoutType: T,
) {
  const workoutExport: Workouts = {
    hiit: [],
    rounds: [],
    sets: [],
  };

  workoutExport[workoutType] = workouts;

  downloadWorkouts(workoutExport);
}

function downloadWorkouts(workouts: Workouts) {
  const json = JSON.stringify(workouts, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "hiit-planner-workouts.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
