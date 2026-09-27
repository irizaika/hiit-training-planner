import type { TrainingMode } from "../../../models/workout";
import { ExerciseBlock } from "./ExerciseBlock/ExerciseBlock";
import { type TrainingWorkoutForm } from "../hooks/useTrainingWorkoutForm";

interface CircularWorkoutFormProps {
  form: TrainingWorkoutForm;
  mode: Extract<TrainingMode, "circular" | "supersets">;
}

export function CircularWorkoutForm({ form, mode }: CircularWorkoutFormProps) {
  const isCircular = mode === "circular";

  return (
    <div className="training-form-section">
      <div className="training-form-section-header">
        <div>
          <h3>{isCircular ? "Exercises" : "Blocks"}</h3>
          <p>
            {isCircular
              ? "Build your circuit from one or more exercises."
              : "Build your workout from one or more blocks."}
          </p>
        </div>
      </div>

      <div className="training-block-list">
        {form.blocks.map((block, blockIndex) => (
          <div className="training-block" key={block.id}>
            {!isCircular && (
              <div className="training-block-header">
                <div>
                  <span className="training-block-number">
                    Block {blockIndex + 1}
                  </span>
                </div>

                {form.blocks.length > 1 && (
                  <button
                    type="button"
                    className="remove-close-button"
                    onClick={() => form.removeBlock(block.id)}
                    aria-label={`Remove block ${blockIndex + 1}`}
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            <div className="training-block-main-row">
              {!isCircular && (
                <>
                  <div className="training-form-group">
                    <label htmlFor={`block-name-${block.id}`}>Block name</label>

                    <input
                      id={`block-name-${block.id}`}
                      type="text"
                      value={block.name ?? ""}
                      onChange={(event) =>
                        form.updateBlock(block.id, {
                          name: event.target.value,
                        })
                      }
                      placeholder="Optional"
                    />
                  </div>
                </>
              )}
              {isCircular && (
                  <div className="training-form-group-dummy">

                  </div>

              )}

              <div className="training-form-group training-repeat-field">
                <label htmlFor={`block-repeat-${block.id}`}>Repeats</label>

                <input
                  id={`block-repeat-${block.id}`}
                  type="number"
                  min="1"
                  value={block.repeatCount}
                  onChange={(event) =>
                    form.updateBlock(block.id, {
                      repeatCount: Number(event.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <ExerciseBlock
              block={block}
              onAddExercise={form.addExercise}
              onRemoveExercise={form.removeExercise}
              onUpdateExercise={form.updateExercise}
              onUpdateTarget={form.updateTarget}
              onUpdateTimer={form.updateTimer}
            />

            <div className="training-rest-row">{/* rest configuration */}</div>
          </div>
        ))}
      </div>

      {!isCircular && (
        <button
          type="button"
          className="add-exercise-button"
          onClick={form.addBlock}
        >
          + Add block
        </button>
      )}
    </div>
  );
}
