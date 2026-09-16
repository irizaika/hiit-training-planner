import type { Workout } from "../../../models/workout";
import { WorkoutCard } from "./WorkoutCard";
import "./WorkoutList.css";

interface WorkoutListProps {
  workouts: Workout[];
  selectedWorkoutId: number | null;
  onSelectWorkout: (workoutId: number) => void;
  onEdit: (workoutId: number) => void;
  onDelete: (workoutId: number) => void;
  onDuplicate: (workoutId: number) => void;
}

export function WorkoutList({
  workouts,
  selectedWorkoutId,
  onSelectWorkout,
  onEdit,
  onDelete,
  onDuplicate,
}: WorkoutListProps) {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          isSelected={workout.id === selectedWorkoutId}
          onSelect={onSelectWorkout}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}