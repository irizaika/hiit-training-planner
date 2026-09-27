import { useState } from "react";
import type {
  WorkoutBlock,
  WorkoutExercise,
  TimerConfig,
  ExerciseTarget,
} from "../../../../models/workout";
import { ExerciseEditor } from "./ExerciseEditor";

interface ExerciseBlockProps {
  block: WorkoutBlock;
  onRemoveExercise: (blockId: number, exerciseId: number) => void;
  onUpdateExercise: (
    blockId: number,
    exerciseId: number,
    update: Partial<WorkoutExercise>,
  ) => void;
  onUpdateTimer: (
    blockId: number,
    exerciseId: number,
    timer: TimerConfig,
  ) => void;
  onUpdateTarget: (
    blockId: number,
    exerciseId: number,
    target: ExerciseTarget,
  ) => void;
  onAddExercise: (id: number) => void;
}

export function ExerciseBlock({
  block,
  onRemoveExercise,
  onUpdateExercise,
  onUpdateTimer,
  onUpdateTarget,
  onAddExercise,
}: ExerciseBlockProps) {
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(
    null,
  );

  const handleEdit = (exerciseId: number) => {
    setEditingExerciseId((currentId) =>
      currentId === exerciseId ? null : exerciseId,
    );
  };

  return (
    <div className="training-subsection">
      <div className="training-subsection-header">
        <div>
          <h4>Exercises</h4>
          <p>Define what you do during each repeat.</p>
        </div>
      </div>

      <div className="training-exercise-list">
        {block.exercises.map((exercise, exerciseIndex) => {
          const isEditing = editingExerciseId === exercise.id;

          return (
            <div
              className={`training-exercise-item ${
                isEditing ? "is-editing" : ""
              }`}
              key={exercise.id}
            >
              {/* Compact row */}
              <div className="training-exercise-row">
                <span className="exercise-number">{exerciseIndex + 1}</span>

                <div className="exercise-info">
                  <span className="exercise-name">
                    {exercise.name || "Unnamed exercise"}
                  </span>

                  <div className="exercise-meta">
                    <span>{getTargetLabel(exercise.target)}</span>

                    {exercise.timer?.enabled && (
                      <>
                        <span className="exercise-meta-separator">·</span>
                        <span>Timer {exercise.timer.seconds}s</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="exercise-actions">
                  <button
                    type="button"
                    className="remove-edit-button"
                    onClick={() => handleEdit(exercise.id)}
                    aria-expanded={isEditing}
                    aria-label={
                      isEditing
                        ? `Close ${exercise.name || "exercise"}`
                        : `Edit ${exercise.name || "exercise"}`
                    }
                    title={
                      isEditing
                        ? `Close ${exercise.name || "exercise"}`
                        : `Edit ${exercise.name || "exercise"}`
                    }
                  >
                    {isEditing ? "✓" : "✎"}
                  </button>

                  {block.exercises.length > 1 && (
                    <button
                      type="button"
                      className="remove-edit-button"
                      onClick={() => onRemoveExercise(block.id, exercise.id)}
                      aria-label={`Remove ${exercise.name || "exercise"}`}
                      title={`Remove ${exercise.name || "exercise"}`}
                    >
                      🗑
                    </button>
                  )}
                </div>
              </div>

              <ExerciseEditor
                isEditing={isEditing}
                block={block}
                exercise={exercise}
                onUpdateExercise={onUpdateExercise}
                onUpdateTarget={onUpdateTarget}
                onUpdateTimer={onUpdateTimer}
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="add-exercise-button"
        onClick={() => {onAddExercise(block.id); setEditingExerciseId(block.exercises.length+1);}}
      >
        + Add exercise
      </button>
    </div>
  );
}

function getTargetLabel(target?: ExerciseTarget): string {
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
