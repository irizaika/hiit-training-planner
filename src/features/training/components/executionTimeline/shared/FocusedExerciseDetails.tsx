import type { WorkoutExercise } from "../../../../../models/workout";
import { ExerciseTarget } from "../../executionList/ExerciseTarget";

interface FocusedExerciseDetailsProps {
  workoutName: string;
  exercise: WorkoutExercise;
  eyebrow: string;
  detail?: string;
  showExerciseTarget?: boolean;
}

export function FocusedExerciseDetails({
  workoutName,
  exercise,
  eyebrow,
  detail,
  showExerciseTarget = true,
}: FocusedExerciseDetailsProps) {
  const hasTarget =
    exercise.target !== undefined && exercise.target.type !== "none";

  return (
    <div className="execution-focus-copy">
      <p className="eyebrow">{eyebrow}</p>

      <h2>{exercise.name || workoutName}</h2>

      {(detail || (showExerciseTarget && hasTarget)) && (
        <div className="execution-focus-target">
          {detail && <span>{detail}</span>}
          {showExerciseTarget && <ExerciseTarget exercise={exercise} />}
        </div>
      )}
    </div>
  );
}
