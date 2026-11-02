import type { TrainingWorkout } from "../../models/workout";
import { TrainingExecutionTimeline } from "./components/executionTimeline/TrainingExecutionTimeline";
import { useTrainingExecution } from "./hooks/useTrainingExecution";
import "./TrainingExecution.css";
import { TrainingHeader } from "./components/TrainingHeader";

interface TrainingExecutionProps {
  workout: TrainingWorkout;
}

export function TrainingExecution({ workout }: TrainingExecutionProps) {
  const execution = useTrainingExecution(workout);
  return (
    <div className="training-execution">
      <TrainingHeader workout={workout} execution={execution} />
      <TrainingExecutionTimeline workout={workout} execution={execution} />
    </div>
  );
}
