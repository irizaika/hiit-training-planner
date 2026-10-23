import type { TrainingWorkout } from "../../../models/workout";
import { WorkoutHeader } from "../../../components/WorkoutHeader";
import { useTrainingExecution } from "../hooks/useTrainingExecution";
import "./TrainingHeader.css";

interface TrainingHeaderProps {
  workout: TrainingWorkout;
  execution: ReturnType<typeof useTrainingExecution>;
}

export function TrainingHeader({ workout, execution }: TrainingHeaderProps) {
  return (
    <WorkoutHeader
      className="training-execution-header"
      title={workout.name}
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
