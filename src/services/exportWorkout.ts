import type {  Workouts } from "../models/workout";

export function exportWorkouts(workouts: Workouts) {
  downloadWorkouts(workouts);
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
