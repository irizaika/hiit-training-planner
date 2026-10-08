import type { TrainingMode } from "../../../../models/workout";
import { ExerciseBlock } from "./ExerciseBlock/ExerciseBlock";
import { type BlockWorkoutForm } from "../../../training/hooks/useBlockWorkoutForm";
import { DurationField } from "../DurationField";

interface CircularWorkoutFormProps {
  form: BlockWorkoutForm;
  mode: Extract<TrainingMode, "circular" | "supersets">;
}

export function CircularWorkoutForm({ form, mode }: CircularWorkoutFormProps) {
  const isCircular = mode === "circular";

  const handleRestEnabledChange = (
    blockId: number,
    field: "restBetweenExercises" | "restBetweenRepeats",
    enabled: boolean,
  ) => {
    const block = form.blocks.find((block) => block.id === blockId);

    if (!block) {
      return;
    }

    const currentRest = block[field] ?? {
      enabled: false,
      seconds: 30,
    };

    form.updateRest(blockId, field, {
      ...currentRest,
      enabled,
    });
  };

  const handleRestSecondsChange = (
    blockId: number,
    field: "restBetweenExercises" | "restBetweenRepeats",
    seconds: number,
  ) => {
    const block = form.blocks.find((block) => block.id === blockId);

    if (!block) {
      return;
    }

    const currentRest = block[field] ?? {
      enabled: false,
      seconds: 30,
    };

    form.updateRest(blockId, field, {
      ...currentRest,
      seconds,
    });
  };

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
        {form.blocks.map((block, blockIndex) => {
          const restBetweenExercises = block.restBetweenExercises ?? {
            enabled: false,
            seconds: 30,
          };

          const restBetweenRepeats = block.restBetweenRepeats ?? {
            enabled: false,
            seconds: 30,
          };

          return (
            <div className="training-block" key={block.id}>
              {!isCircular && (
                <div className="training-block-header">
                  <span className="training-block-number">
                    Block {blockIndex + 1}
                  </span>

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

              {!isCircular && (
                <div className="training-block-name-row">
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
                </div>
              )}

              <div className="training-block-settings-row">
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

                <DurationField
                  id={`block-rest-exercises-${block.id}`}
                  label="Rest after exercise"
                  value={restBetweenExercises.seconds}
                  onChange={(seconds) =>
                    handleRestSecondsChange(
                      block.id,
                      "restBetweenExercises",
                      seconds,
                    )
                  }
                  disabled={!restBetweenExercises.enabled}
                  required={restBetweenExercises.enabled}
                  checkbox={{
                    checked: restBetweenExercises.enabled,
                    onChange: (enabled) =>
                      handleRestEnabledChange(
                        block.id,
                        "restBetweenExercises",
                        enabled,
                      ),
                  }}
                />

                <DurationField
                  id={`block-rest-repeats-${block.id}`}
                  label="Rest after repeat"
                  value={restBetweenRepeats.seconds}
                  onChange={(seconds) =>
                    handleRestSecondsChange(
                      block.id,
                      "restBetweenRepeats",
                      seconds,
                    )
                  }
                  disabled={!restBetweenRepeats.enabled}
                  required={restBetweenRepeats.enabled}
                  checkbox={{
                    checked: restBetweenRepeats.enabled,
                    onChange: (enabled) =>
                      handleRestEnabledChange(
                        block.id,
                        "restBetweenRepeats",
                        enabled,
                      ),
                  }}
                />
              </div>

              <ExerciseBlock block={block} form={form} />
            </div>
          );
        })}
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
