import type { TrainingWorkout } from "../../models/workout";
import { BlockExecutionList } from "./components/BlockExecutionList";
import { SetsExecutionList } from "./components/SetsExecutionList";
import { TrainingExecutionTimer } from "./components/TrainingExecutionTimer";
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

      <div
        className="execution-progress-track"
        role="progressbar"
        aria-label="Workout progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={execution.progress}
      >
        <span style={{ width: `${execution.progress}%` }} />
      </div>

      <TrainingExecutionTimer
        timer={execution.timer}
        onPause={execution.pauseTimer}
        onResume={execution.resumeTimer}
        onClear={execution.clearTimer}
      />

      {workout.mode === "sets" ? (
        <SetsExecutionList
          workout={workout}
          completed={execution.completed}
          onToggle={execution.toggleCompleted}
          onToggleGroup={execution.toggleGroupCompleted}
          onStartTimer={execution.startTimer}
        />
      ) : (
        <BlockExecutionList
          workout={workout}
          completed={execution.completed}
          onToggle={execution.toggleCompleted}
          onToggleGroup={execution.toggleGroupCompleted}
          onStartTimer={execution.startTimer}
          getBlockKeys={execution.getBlockKeys}
        />
      )}
    </div>
  );
}
