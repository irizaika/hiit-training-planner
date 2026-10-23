import { formatTime } from "../../../../../utils/time";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";

interface ExerciseTimerControlsProps {
  timerLabel: string;
  displayedSeconds: number | undefined;
  startSeconds: number | undefined;
  startLabel: string;
  stepKey: string;
  restSeconds: number | undefined;
  isExerciseTimer: boolean;
  execution: TrainingExecutionState;
}

export function ExerciseTimerControls({
  timerLabel,
  displayedSeconds,
  startSeconds,
  startLabel,
  stepKey,
  restSeconds,
  isExerciseTimer,
  execution,
}: ExerciseTimerControlsProps) {
  const timer = execution.timer;
  const canStart =
    startSeconds !== undefined &&
    startSeconds > 0 &&
    (timer === null || timer.remainingSeconds > 0 || isExerciseTimer);

  function handleStartStop() {
    if (timer?.isRunning) {
      execution.pauseTimer();
    } else if (timer && timer.remainingSeconds > 0) {
      execution.resumeTimer();
    } else if (canStart) {
      if (isExerciseTimer) {
        execution.startExerciseTimer(
          startLabel,
          startSeconds,
          stepKey,
          restSeconds,
        );
      } else {
        execution.startTimer(startLabel, startSeconds);
      }
    }
  }

  const label = timer?.isRunning
    ? "Pause timer"
    : timer && timer.remainingSeconds > 0
      ? "Resume timer"
      : "Start timer";

  return (
    <div className="execution-focus-timer">
      <span>{timerLabel}</span>
      <strong className="execution-focus-timer-display">
        {displayedSeconds === undefined
          ? "--:--"
          : formatTime(displayedSeconds)}
      </strong>
      <div className="execution-focus-timer-actions">
        <button
          type="button"
          className="is-start-stop"
          disabled={
            !timer?.isRunning &&
            !(timer && timer.remainingSeconds > 0) &&
            !canStart
          }
          aria-label={label}
          title={label}
          onClick={handleStartStop}
        >
          <span aria-hidden="true">{timer?.isRunning ? "⏸" : "▷"}</span>
        </button>
        <button
          type="button"
          className="is-reset"
          aria-label="Reset timer"
          title="Reset timer"
          disabled={!timer}
          onClick={execution.clearTimer}
        >
          <span aria-hidden="true">↺</span>
        </button>
      </div>
    </div>
  );
}
