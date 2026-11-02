import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import type { TimelineGroup, TimelineStep } from "../shared/timelineTypes";
import { ExerciseTimerControls } from "../shared/ExerciseTimerControls";
import { FocusedExerciseDetails } from "../shared/FocusedExerciseDetails";
import { WorkoutStepMarkers } from "../shared/WorkoutStepMarkers";
import { getExerciseTimerSeconds } from "../shared/getExerciseTimerSeconds";

interface SetsWorkoutFocusProps {
  workoutName: string;
  selectedGroup: TimelineGroup;
  focusStep: TimelineStep;
  execution: TrainingExecutionState;
  restSeconds: number | undefined;
  onToggleStep: (step: TimelineStep) => void;
}

export function SetsWorkoutFocus({
  workoutName,
  selectedGroup,
  focusStep,
  execution,
  restSeconds,
  onToggleStep,
}: SetsWorkoutFocusProps) {
  const { completed, timer } = execution;
  const isResting = timer?.purpose === "rest" && timer.remainingSeconds > 0;
  const isExerciseTimerActive =
    timer?.purpose === "exercise" && timer.remainingSeconds > 0;

  const currentSetIndex = selectedGroup.children.findIndex(
    (step) => step.key === focusStep.key,
  );

  const allSetsComplete = selectedGroup.children.every(
    (step) => completed[step.key],
  );

  const exerciseTimerSeconds = getExerciseTimerSeconds(focusStep.exercise);

  const startSeconds =
    exerciseTimerSeconds ?? restSeconds;

  const startLabel =
    exerciseTimerSeconds !== undefined
      ? focusStep.exercise.name
      : "Rest";

  const repsTarget =
    focusStep.exercise.target?.type === "reps"
      ? `${focusStep.exercise.target.value} reps`
      : undefined;

  const setHeading = allSetsComplete
    ? "ALL SETS COMPLETE"
    : `SET ${currentSetIndex + 1} OF ${selectedGroup.children.length}`;

  const statusLabel = isResting
    ? `UP NEXT · ${setHeading}`
    : isExerciseTimerActive
      ? `WORKING NOW · ${setHeading}`
      : undefined;

  return (
    <section className="execution-focus mode-sets" aria-live="polite">
      <div className="execution-focus-timer-container">
        <ExerciseTimerControls
          startSeconds={startSeconds}
          startLabel={startLabel}
          stepKey={focusStep.key}
          restSeconds={restSeconds}
          isExerciseTimer={exerciseTimerSeconds !== undefined}
          execution={execution}
        />
      </div>

      <FocusedExerciseDetails
        workoutName={workoutName}
        exercise={focusStep.exercise}
        eyebrow={statusLabel ?? setHeading}
        detail={repsTarget}
        showExerciseTarget={!repsTarget}
      />

      <WorkoutStepMarkers
        steps={selectedGroup.children}
        focusStep={focusStep}
        completed={execution.completed}
        isResting={isResting}
        label="Exercise sets"
        onToggleStep={onToggleStep}
        onStartTimer={execution.startTimer}
      />
    </section>
  );
}
