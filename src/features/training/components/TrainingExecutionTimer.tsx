import { formatTime } from "../../../utils/time";
import type { ExecutionTimer } from "../hooks/useTrainingExecution";
import "./TrainingExecutionTimer.css";

interface TrainingExecutionTimerProps {
  timer: ExecutionTimer | null;
  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
}

export function TrainingExecutionTimer({
  timer,
  onPause,
  onResume,
  onClear,
}: TrainingExecutionTimerProps) {
  return (
    <section className="execution-timer" aria-live="polite">
      <div>
        <p className="eyebrow">TIMER</p>
        <h3>{timer?.label ?? "Ready when you are"}</h3>
      </div>
      <strong className="execution-timer-time">
        {timer ? formatTime(timer.remainingSeconds) : "--:--"}
      </strong>
      {timer && (
        <div className="execution-timer-controls">
          {timer.remainingSeconds > 0 && (
            <button
              type="button"
              onClick={timer.isRunning ? onPause : onResume}
            >
              {timer.isRunning ? "Pause" : "Resume"}
            </button>
          )}
          <button type="button" onClick={onClear}>
            Clear
          </button>
        </div>
      )}
    </section>
  );
}
