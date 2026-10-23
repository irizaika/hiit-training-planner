import type { WorkoutExercise } from "../../../../../models/workout";
import { ExerciseTarget } from "../../executionList/ExerciseTarget";

interface FocusedExerciseDetailsProps {
  workoutName: string;
  exercise: WorkoutExercise;
  isWorkoutComplete: boolean;
  setHeading: string;
  repsTarget: string | undefined;
  statusLabel?: string;
}

export function FocusedExerciseDetails({
  workoutName,
  exercise,
  isWorkoutComplete,
  setHeading,
  repsTarget,
  statusLabel,
}: FocusedExerciseDetailsProps) {
  const headingText = isWorkoutComplete
    ? "WORKOUT COMPLETE"
    : statusLabel ?? setHeading;

  return (
    <div className="execution-focus-copy">
      <p className="eyebrow">{headingText}</p>

      <h2>{exercise.name || workoutName}</h2>

      {repsTarget && !isWorkoutComplete ? (
        <div className="execution-focus-target">{repsTarget}</div>
      ) : exercise.target?.type !== "reps" ? (
        <div className="execution-focus-target">
          <ExerciseTarget exercise={exercise} />
        </div>
      ) : null}
    </div>
  );
}
