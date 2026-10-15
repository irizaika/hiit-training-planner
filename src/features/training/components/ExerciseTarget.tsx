
import type { WorkoutExercise } from "../../../models/workout";
import { formatTime } from "../../../utils/time";

export function ExerciseTarget({ exercise }: { exercise: WorkoutExercise }) {
  const target = exercise.target;
  if (!target || target.type === "none") {
    return null;
  }

  let label: string;
  switch (target.type) {
    case "reps":
      label = `${target.value} reps`;
      break;
    case "duration":
      label = `${formatTime(target.seconds)}`;
      break;
    case "distance":
      label = `${target.value} ${target.unit}`;
      break;
  }

  return <span className="execution-target">{label}</span>;
}