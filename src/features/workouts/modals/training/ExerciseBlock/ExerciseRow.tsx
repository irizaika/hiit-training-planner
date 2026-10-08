import type {
  WorkoutBlock,
  WorkoutExercise,
  ExerciseTarget,
} from "../../../../../models/workout";

interface ExerciseRowProps {
  block?: WorkoutBlock;
  exercise: WorkoutExercise;
  isEditing: boolean;
  exerciseIndex: number;
  canRemove?: boolean;
  sets?: number | null;
  onRemoveExercise: (
    blockId: number,
    exerciseId: number,
  ) => void;

  onRemoveSetExercise?: (exerciseId: number) => void;

  onEditExercise: (exerciseId: number) => void;
}

export function ExerciseRow({
  block,
  exercise,
  isEditing,
  exerciseIndex,
  canRemove = false,
  onRemoveExercise,
  onRemoveSetExercise,
  onEditExercise,
}: ExerciseRowProps) {
  const handleRemove = () => {
    if (block) {
      onRemoveExercise(block.id, exercise.id);
      return;
    }

    onRemoveSetExercise?.(exercise.id);
  };

  return (
    <div className="training-exercise-row">
      <span className="exercise-number">
        {exerciseIndex + 1}
      </span>

      <div className="exercise-info">
        <span className="exercise-name">
          {exercise.name || "Unnamed exercise"}
        </span>

        <div className="exercise-meta">
          <span>
            {getTargetLabel(exercise.target)}
          </span>

          {exercise.timer?.enabled && (
            <>
              <span className="exercise-meta-separator">
                ·
              </span>

              <span>
                Timer {exercise.timer.seconds}s
              </span>
            </>
          )}

        </div>
      </div>

      <div className="exercise-actions">
        <button
          type="button"
          className="remove-edit-button"
          onClick={() =>
            onEditExercise(exercise.id)
          }
          aria-expanded={isEditing}
          aria-label={
            isEditing
              ? `Close ${
                  exercise.name || "exercise"
                }`
              : `Edit ${
                  exercise.name || "exercise"
                }`
          }
          title={
            isEditing
              ? `Close ${
                  exercise.name || "exercise"
                }`
              : `Edit ${
                  exercise.name || "exercise"
                }`
          }
        >
          {isEditing ? "✓" : "✎"}
        </button>

        {canRemove && (
          <button
            type="button"
            className="remove-edit-button"
            onClick={handleRemove}
            aria-label={`Remove ${
              exercise.name || "exercise"
            }`}
            title={`Remove ${
              exercise.name || "exercise"
            }`}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}

function getTargetLabel(
  target?: ExerciseTarget,
): string {
  if (!target || target.type === "none") {
    return "No target";
  }

  switch (target.type) {
    case "reps":
      return `${target.value} reps`;

    case "duration":
      return `${target.seconds}s`;

    case "distance":
      return `${target.value} ${target.unit}`;
  }
}
