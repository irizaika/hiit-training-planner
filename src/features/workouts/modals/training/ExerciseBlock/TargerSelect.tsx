import type {
  WorkoutExercise,
  ExerciseTarget,
} from "../../../../../models/workout";

interface TargetSelectProps {
  updateTarget: (
    blockId: number,
    exerciseId: number,
    target: ExerciseTarget,
  ) => void;
  blockId: number;
  exercise: WorkoutExercise;
}

export function TargetSelect({
  updateTarget,
  blockId,
  exercise,
}: TargetSelectProps) {
  return (
    <div className="training-exercise-options">
      <div className="training-form-group">
        <label htmlFor={`target-${blockId}-${exercise.id}`}>Target</label>

        <select
          id={`target-${blockId}-${exercise.id}`}
          value={exercise.target?.type ?? "none"}
          onChange={(event) => {
            const type = event.target.value;

            if (type === "reps") {
              updateTarget(blockId, exercise.id, {
                type: "reps",
                value: 10,
              });
            } else if (type === "duration") {
              updateTarget(blockId, exercise.id, {
                type: "duration",
                seconds: 30,
              });
            } else if (type === "distance") {
              updateTarget(blockId, exercise.id, {
                type: "distance",
                value: 100,
                unit: "m",
              });
            } else {
              updateTarget(blockId, exercise.id, {
                type: "none",
              });
            }
          }}
        >
          <option value="none">None</option>
          <option value="reps">Reps</option>
          <option value="duration">Duration</option>
          <option value="distance">Distance</option>
        </select>
      </div>

      {exercise.target?.type === "reps" && (
        <div className="training-form-group">
          <label>Value</label>
          <input
            type="number"
            min="1"
            value={exercise.target.value}
            onChange={(event) =>
              updateTarget(blockId, exercise.id, {
                type: "reps",
                value: Number(event.target.value),
              })
            }
          />
        </div>
      )}

      {exercise.target?.type === "duration" && (
        <div className="training-form-group">
          <label>Seconds</label>
          <input
            type="number"
            min="1"
            value={exercise.target.seconds}
            onChange={(event) =>
              updateTarget(blockId, exercise.id, {
                type: "duration",
                seconds: Number(event.target.value),
              })
            }
          />
        </div>
      )}

      {exercise.target?.type === "distance" && (
        <>
          <div className="training-form-group">
            <label>Distance</label>
            <input
              type="number"
              min="1"
              value={exercise.target.value}
              onChange={(event) =>
                updateTarget(blockId, exercise.id, {
                  type: "distance",
                  value: Number(event.target.value),
                  unit:
                    exercise.target?.type === "distance"
                      ? exercise.target.unit
                      : "m",
                })
              }
            />
          </div>

          <div className="training-form-group">
            <label>Unit</label>
            <select
              value={exercise.target.unit}
              onChange={(event) =>
                updateTarget(blockId, exercise.id, {
                  type: "distance",
                  value:
                    exercise.target?.type === "distance"
                      ? exercise.target.value
                      : 100,
                  unit: event.target.value as "m" | "km",
                })
              }
            >
              <option value="m">m</option>
              <option value="km">km</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}
