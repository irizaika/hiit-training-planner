import type { Workout } from "../../../models/workout";
import { WorkoutMenu } from "./WorkoutMenu";
import "./WorkoutCard.css";

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

          <p>{getWorkoutSummary(workout)}</p>
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

function getWorkoutSummary(workout: Workout): string {
  switch (workout.type) {
    case "hiit": {
      const details = [
        `${workout.workSeconds}s work`,
        workout.restEnabled && `${workout.restSeconds}s rest`,
        workout.roundRestEnabled && `${workout.roundRestSeconds}s round rest`,
        `${workout.exercises.length} exercises`,
        `${workout.rounds} rounds`,
      ].filter(Boolean);

      return details.join(" · ");
    }

    case "training":
      return getTrainingSummary(workout);
  }
}

function getTrainingSummary(
  workout: Extract<Workout, { type: "training" }>,
): string {
  if (workout.mode == "sets" && workout !=null && workout.exercises !=null) {

    const details = `${workout.exercises.length} exercises`;
    return details;

  } else if (workout.mode == "circular" || workout.mode == "supersets" ){
    const exerciseCount = workout.blocks.reduce(
      (total, block) => total + block.exercises.length,
      0,
    );

    const repeatCounts = workout.blocks
      .map((block) => block.repeatCount)
      .join(" + ");

    const hasMultipleBlocks = workout.blocks.length > 1;

    const details = [
      hasMultipleBlocks
        ? `${workout.blocks.length} blocks`
        : `${exerciseCount} exercises`,
      `${repeatCounts} ${hasMultipleBlocks ? "repeats" : "rounds"}`,
    ];

    if (hasMultipleBlocks) {
      details.push(`${exerciseCount} exercises`);
    }

    return details.join(" · ");
  }
  return "";
}
