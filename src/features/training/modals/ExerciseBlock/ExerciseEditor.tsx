import type {
  WorkoutBlock,
  WorkoutExercise,
  TimerConfig,
  ExerciseTarget,
} from "../../../../models/workout";
import { TargetSelect } from "./TargerSelect";

interface ExerciseEditorProp {
  block: WorkoutBlock;
  exercise: WorkoutExercise;
  isEditing: boolean;
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
}

export function ExerciseEditor({
  block,
  exercise,
  isEditing,
  onUpdateExercise,
  onUpdateTimer,
  onUpdateTarget,
}: ExerciseEditorProp) {
  return (
    <>
      {isEditing && (
        <div className="training-exercise-editor">
          <div className="training-form-group">
            <label htmlFor={`exercise-name-${block.id}-${exercise.id}`}>
              Exercise
            </label>

            <input
              id={`exercise-name-${block.id}-${exercise.id}`}
              type="text"
              value={exercise.name}
              onChange={(event) =>
                onUpdateExercise(block.id, exercise.id, {
                  name: event.target.value,
                })
              }
              placeholder="e.g. Push-ups"
              required
              autoFocus
            />
          </div>

          <TargetSelect
            updateTarget={onUpdateTarget}
            block={block}
            exercise={exercise}
          />

          <label className="training-checkbox-label">
            <input
              type="checkbox"
              checked={exercise.timer?.enabled ?? false}
              onChange={(event) => {
                onUpdateTimer(
                  block.id,
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
              <label htmlFor={`timer-${block.id}-${exercise.id}`}>Timer</label>

              <input
                id={`timer-${block.id}-${exercise.id}`}
                type="number"
                min="1"
                value={exercise.timer.seconds}
                onChange={(event) =>
                  onUpdateTimer(block.id, exercise.id, {
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
