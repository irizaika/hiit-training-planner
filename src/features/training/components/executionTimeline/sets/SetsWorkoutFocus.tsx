import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import type { TimelineGroup, TimelineStep } from "../shared/timelineTypes";
import { ExerciseTimerControls } from "./ExerciseTimerControls";
import { FocusedExerciseDetails } from "./FocusedExerciseDetails";
import { SetCompletionMarkers } from "./SetCompletionMarkers";

interface SetsWorkoutFocusProps {
  workoutName: string;
  selectedGroup: TimelineGroup;
  focusStep: TimelineStep;
  completedCount: number;
  total: number;
  execution: TrainingExecutionState;
  restSeconds: number | undefined;
  onToggleStep: (step: TimelineStep) => void;
}

export function SetsWorkoutFocus({
  workoutName,
  selectedGroup,
  focusStep,
  completedCount,
  total,
  execution,
  restSeconds,
  onToggleStep,
}: SetsWorkoutFocusProps) {
  const { completed, timer } = execution;
  const isWorkoutComplete = completedCount === total;
  const isResting = timer?.purpose === "rest" && timer.remainingSeconds > 0;
  const isExerciseTimerActive =
    timer?.purpose === "exercise" && timer.remainingSeconds > 0;

  const currentSetIndex = selectedGroup.children.findIndex(
    (step) => step.key === focusStep.key,
  );

  const allSetsComplete = selectedGroup.children.every(
    (step) => completed[step.key],
  );

  const exerciseTimer = focusStep.exercise.timer;

  const startSeconds =
    exerciseTimer?.enabled && exerciseTimer.seconds > 0
      ? exerciseTimer.seconds
      : restSeconds;

  const startLabel =
    exerciseTimer?.enabled && exerciseTimer.seconds > 0
      ? focusStep.exercise.name
      : "Rest";

  const displayedSeconds = timer?.remainingSeconds ?? startSeconds;

  const timerLabel = timer?.label ?? (startSeconds ? startLabel : "Timer");

  const repsTarget =
    focusStep.exercise.target?.type === "reps"
      ? `${focusStep.exercise.target.value} reps`
      : undefined;

  const setHeading = allSetsComplete
    ? "ALL SETS COMPLETE"
    : `SET ${currentSetIndex + 1} OF ${selectedGroup.children.length}`;

  const statusLablel = isResting
    ? `UP NEXT · ${setHeading}`
    : isExerciseTimerActive
      ? `WORKING NOW · ${setHeading}`
      : undefined;

  return (
    <section className="execution-focus mode-sets" aria-live="polite">
      <div className="execution-focus-steps">
        <ExerciseTimerControls
          timerLabel={timerLabel}
          displayedSeconds={displayedSeconds}
          startSeconds={startSeconds}
          startLabel={startLabel}
          stepKey={focusStep.key}
          restSeconds={restSeconds}
          isExerciseTimer={exerciseTimer?.enabled === true}
          execution={execution}
        />
      </div>

      <FocusedExerciseDetails
        workoutName={workoutName}
        exercise={focusStep.exercise}
        isWorkoutComplete={isWorkoutComplete}
        setHeading={setHeading}
        repsTarget={repsTarget}
        statusLabel={statusLablel}
      />

      <SetCompletionMarkers
        steps={selectedGroup.children}
        focusStep={focusStep}
        completed={execution.completed}
        isResting={isResting}
        onToggleStep={onToggleStep}
        execution={execution}
      />
    </section>
  );
}
