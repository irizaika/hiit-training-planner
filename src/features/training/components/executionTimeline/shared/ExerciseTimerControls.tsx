import { formatTime } from "../../../../../utils/time";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";

interface ExerciseTimerControlsProps {
  startSeconds: number | undefined;
  startLabel: string;
  stepKey: string;
  restSeconds: number | undefined;
  isExerciseTimer: boolean;
  execution: TrainingExecutionState;
}

export function ExerciseTimerControls({
  startSeconds,
  startLabel,
  stepKey,
  restSeconds,
  isExerciseTimer,
  execution,
}: ExerciseTimerControlsProps) {
  const timer = execution.timer;
  const timerForCurrentStep =
    (timer?.purpose === "rest" && timer.remainingSeconds > 0) ||
    timer?.completesStep?.key === stepKey
      ? timer
      : null;
  const canStart =
    startSeconds !== undefined &&
    startSeconds > 0 &&
    (!timerForCurrentStep ||
      timerForCurrentStep.remainingSeconds === 0 ||
      isExerciseTimer);

  function handleStartStop() {
    if (timerForCurrentStep?.isRunning) {
      execution.pauseTimer();
    } else if (
      timerForCurrentStep &&
      timerForCurrentStep.remainingSeconds > 0
    ) {
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

  const label = timerForCurrentStep?.isRunning
    ? "Pause timer"
    : timerForCurrentStep && timerForCurrentStep.remainingSeconds > 0
      ? "Resume timer"
      : "Start timer";
  const timerLabel = timerForCurrentStep?.label ?? startLabel;
  const displayedSeconds =
    timerForCurrentStep?.remainingSeconds ?? startSeconds;

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
          disabled={!timerForCurrentStep?.isRunning &&
            !(timerForCurrentStep && timerForCurrentStep.remainingSeconds > 0) &&
            !canStart}
          aria-label={label}
          title={label}
          onClick={handleStartStop}
        >
          <span aria-hidden="true">{timerForCurrentStep?.isRunning ? "⏸" : "▷"}</span>
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
