import type { Workout } from "../../models/workout";
import "./WorkoutList.css";

interface WorkoutListProps {
  workouts: Workout[];
  selectedWorkoutId: number | null;
  onSelectWorkout: (workoutId: number) => void;
  onDelete: (workoutId: number) => void;
}

export function WorkoutList({
  workouts,
  selectedWorkoutId,
  onSelectWorkout,
  onDelete,
}: WorkoutListProps) {
  return (
    <div className="workout-list">
      {workouts.map((workout) => {
        const isSelected = workout.id === selectedWorkoutId;

        return (
          <div
            key={workout.id}
            className={`workout-card ${isSelected ? "selected" : ""}`}
          >
            <button
              type="button"
              className="workout-card-main"
              onClick={() => onSelectWorkout(workout.id)}
            >
              <div className="workout-card-content">
                <h2>{workout.name}</h2>

                <p>{getWorkoutDescription(workout)}</p>

                <span>{getWorkoutMeta(workout)}</span>
              </div>

              <span className="workout-arrow">→</span>
            </button>

            <button
              type="button"
              className="workout-delete-button"
              aria-label={`Delete ${workout.name}`}
              onClick={() => onDelete(workout.id)}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

function getWorkoutDescription(workout: Workout): string {
  switch (workout.type) {
    case "hiit":
      return `${workout.workSeconds}s work · ${workout.restSeconds}s rest`;

    case "rounds":
      return `${workout.rounds.length} exercises per round`;

    case "sets":
      return `${workout.exercises.length} exercises`;

    default:
      return "";
  }
}

function getWorkoutMeta(workout: Workout): string {
  switch (workout.type) {
    case "hiit":
      return `${workout.rounds} rounds`;

    case "rounds":
      return `${workout.repeatCount} repeats`;

    case "sets":
      return `${workout.sets} sets`;

    default:
      return "";
  }
}
