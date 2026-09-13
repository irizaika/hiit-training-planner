import type { Workout } from "../../models/workout";
import { WorkoutMenu } from "./WorkoutMenu";
import "./WorkoutCard.css"

interface WorkoutCardProps {
  workout: Workout;
  isSelected: boolean;
  onSelect: (workoutId: number) => void;
  onEdit: (workoutId: number) => void;
  onDelete: (workoutId: number) => void;
  onDuplicate: (workoutId: number) => void;
}

export function WorkoutCard({
  workout,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
}: WorkoutCardProps) {
  return (
    <div className={`workout-card ${isSelected ? "selected" : ""}`}>
      <button
        type="button"
        className="workout-card-main"
        onClick={() => onSelect(workout.id)}
      >
        <div className="workout-card-content">
          <h2>{workout.name}</h2>

          <p>
            {getWorkoutDescription(workout)}
            <span className="workout-separator"> · </span>
            {getWorkoutMeta(workout)}
          </p>
        </div>
      </button>

      <WorkoutMenu
        workout={workout}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
      />
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
  }
}