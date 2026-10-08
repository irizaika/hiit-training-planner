import type { SetExercise } from "../../../../../models/workout";
import type { SetsWorkoutForm } from "../../../../training/hooks/useSetsWorkoutForm";
import { TargetSelect } from "./TargerSelect";

interface SetExerciseEditorProps {
  exercise: SetExercise;
  form: SetsWorkoutForm;
}

export function SetExerciseEditor({
  exercise,
  form,
}: SetExerciseEditorProps) {
  return (
    <div className="training-exercise-editor">
      <div className="training-form-group">
        <label htmlFor={`set-exercise-name-${exercise.id}`}>
          Exercise
        </label>

        <input
          id={`set-exercise-name-${exercise.id}`}
          type="text"
          value={exercise.name}
          onChange={(event) =>
            form.updateExercise(exercise.id, {
              name: event.target.value,
            })
          }
          placeholder="e.g. Push-ups"
          required
          autoFocus
        />
      </div>

      <TargetSelect
        exercise={exercise}
        updateTarget={(blockId, exerciseId, target) =>
          form.updateExercise(exerciseId, { target })
        }
        blockId={0}
      />

      <div className="training-form-group">
        <label htmlFor={`sets-${exercise.id}`}>
          Sets
        </label>

        <input
          id={`sets-${exercise.id}`}
          type="number"
          min="1"
          value={exercise.sets}
          onChange={(event) =>
            form.updateExercise(exercise.id, {
              sets: Math.max(1, Number(event.target.value)),
            })
          }
        />
      </div>

      <label className="training-checkbox-label">
        <input
          type="checkbox"
          checked={exercise.timer?.enabled ?? false}
          onChange={(event) =>
            form.updateExercise(exercise.id, {
              timer: event.target.checked
                ? {
                    enabled: true,
                    seconds: 30,
                  }
                : {
                    enabled: false,
                  },
            })
          }
        />

        <span>Use timer</span>
      </label>

      {exercise.timer?.enabled && (
        <div className="training-form-group">
          <label htmlFor={`set-timer-${exercise.id}`}>
            Timer
          </label>

          <input
            id={`set-timer-${exercise.id}`}
            type="number"
            min="1"
            value={exercise.timer.seconds}
            onChange={(event) =>
              form.updateExercise(exercise.id, {
                timer: {
                  enabled: true,
                  seconds: Math.max(
                    1,
                    Number(event.target.value),
                  ),
                },
              })
            }
          />
        </div>
      )}

      <div className="training-form-group">
        <label htmlFor={`rest-between-sets-${exercise.id}`}>
          Rest between sets
        </label>

        <div className="training-inline-field">
          <input
            id={`rest-between-sets-${exercise.id}`}
            type="number"
            min="1"
            disabled={
              !exercise.restBetweenSets?.enabled
            }
            value={
              exercise.restBetweenSets?.seconds ?? 60
            }
            onChange={(event) =>
              form.updateExercise(exercise.id, {
                restBetweenSets: {
                  enabled: true,
                  seconds: Math.max(
                    1,
                    Number(event.target.value),
                  ),
                },
              })
            }
          />

          <label className="training-checkbox-label">
            <input
              type="checkbox"
              checked={
                exercise.restBetweenSets?.enabled ?? false
              }
              onChange={(event) =>
                form.updateExercise(exercise.id, {
                  restBetweenSets: {
                    enabled: event.target.checked,
                    seconds:
                      exercise.restBetweenSets?.seconds ?? 60,
                  },
                })
              }
            />

            <span>Enable</span>
          </label>
        </div>
      </div>
    </div>
  );
}
