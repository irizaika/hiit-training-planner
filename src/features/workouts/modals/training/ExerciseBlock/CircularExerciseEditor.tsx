import type { WorkoutBlock, WorkoutExercise } from "../../../../../models/workout";
import type { BlockWorkoutForm } from "../../../../training/hooks/useBlockWorkoutForm";
import { TargetSelect } from "./TargerSelect";

interface CircularExerciseEditorProp {
  block?: WorkoutBlock;
  exercise: WorkoutExercise;
  isEditing: boolean;
  form: BlockWorkoutForm
}

export function CircularExerciseEditor({
  block,
  exercise,
  isEditing,
  form
}: CircularExerciseEditorProp) {
  const blockId: number= block?.id??0;
  return (
    <>
      {isEditing && (
        <div className="training-exercise-editor">
          <div className="training-form-group">
            <label htmlFor={`exercise-name-${blockId}-${exercise.id}`}>
              Exercise
            </label>

            <input
              id={`exercise-name-${blockId}-${exercise.id}`}
              type="text"
              value={exercise.name}
              onChange={(event) =>
                form.updateExercise(blockId, exercise.id, {
                  name: event.target.value,
                })
              }
              placeholder="e.g. Push-ups"
              required
              autoFocus
            />
          </div>

          <TargetSelect
            updateTarget={form.updateTarget}
            blockId={blockId}
            exercise={exercise}
          />

          <label className="training-checkbox-label">
            <input
              type="checkbox"
              checked={exercise.timer?.enabled ?? false}
              onChange={(event) => {
                form.updateTimer(
                  block?.id??0,
                  exercise.id,
                  event.target.checked
                    ? {
                        enabled: true,
                        seconds: 30,
                      }
                    : {
                        enabled: false,
                      },
                );
              }}
            />

            <span>Use timer</span>
          </label>

          {exercise.timer?.enabled && (
            <div className="training-form-group">
              <label htmlFor={`timer-${blockId}-${exercise.id}`}>Timer</label>

              <input
                id={`timer-${blockId}-${exercise.id}`}
                type="number"
                min="1"
                value={exercise.timer.seconds}
                onChange={(event) =>
                  form.updateTimer(blockId, exercise.id, {
                    enabled: true,
                    seconds: Number(event.target.value),
                  })
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
