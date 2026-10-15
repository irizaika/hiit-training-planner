import type { TrainingWorkout } from "../../../models/workout";
import { WorkoutHeader } from "../../../components/WorkoutHeader";
import { useTrainingExecution } from "../hooks/useTrainingExecution";
import "./TrainingHeader.css";

interface TrainingHeaderProps {
  workout: TrainingWorkout;
  execution: ReturnType<typeof useTrainingExecution>;
}

export function TrainingHeader({ workout, execution }: TrainingHeaderProps) {
  const unit = workout.mode === "sets" ? "sets" : "exercises";

  return (
      <WorkoutHeader
        className="training-execution-header"
        status="WORKOUT EXECUTION"
        title={workout.name}
        meta={
          <>
            <span>
              {execution.completedCount}/{execution.exerciseKeys.length} {unit}
            </span>
            <span className="separator">·</span>
            <span>{execution.progress}% complete</span>
          </>
        }
        details={<span>{getWorkoutModeLabel(workout)}</span>}
        action={
          <button
            type="button"
            className="timer-menu-button execution-reset-button"
            aria-label="Reset workout progress"
            title="Reset progress"
            onClick={execution.resetProgress}
            disabled={execution.completedCount === 0}
          >
            ↺
          </button>
        }
      />
  );
}

function getWorkoutModeLabel(workout: TrainingWorkout): string {
  switch (workout.mode) {
    case "sets":
      return "Sets workout";
    case "circular":
      return "Circuit workout";
    case "supersets":
      return "Superset workout";
  }
}
