import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import { ExerciseTimerControls } from "../shared/ExerciseTimerControls";
import { FocusedExerciseDetails } from "../shared/FocusedExerciseDetails";
import { WorkoutStepMarkers } from "../shared/WorkoutStepMarkers";
import { getExerciseTimerSeconds } from "../shared/getExerciseTimerSeconds";
import type { TimelineGroup, TimelineStep } from "../shared/timelineTypes";

interface BlockWorkoutFocusProps {
  workoutName: string;
  repetitionLabel: string;
  selectedGroup: TimelineGroup;
  selectedColorIndex: number;
  focusStep: TimelineStep;
  completed: Record<string, boolean>;
  execution: TrainingExecutionState;
  isWorkoutComplete: boolean;
  isResting: boolean;
  completeAllLabel: string;
  onToggleStep: (step: TimelineStep) => void;
  onCompleteAll: () => void;
}

export function BlockWorkoutFocus({
  workoutName,
  repetitionLabel,
  selectedGroup,
  selectedColorIndex,
  focusStep,
  completed,
  execution,
  isWorkoutComplete,
  isResting,
  completeAllLabel,
  onToggleStep,
  onCompleteAll,
}: BlockWorkoutFocusProps) {
  const { timer } = execution;
  const exerciseTimerSeconds = getExerciseTimerSeconds(focusStep.exercise);
  const isExerciseTimerActive =
    timer?.purpose === "exercise" && timer.remainingSeconds > 0;
  const restSeconds =
    focusStep.restAfter?.enabled && focusStep.restAfter.seconds > 0
      ? focusStep.restAfter.seconds
      : undefined;
  const hasExerciseTimer = exerciseTimerSeconds !== undefined;
  const startSeconds = exerciseTimerSeconds ?? restSeconds;
  const startLabel = hasExerciseTimer
    ? focusStep.exercise.name
    : "Rest";
  const currentExerciseIndex = selectedGroup.children.findIndex(
    (step) => step.key === focusStep.key,
  );
  const stepHeading = `${repetitionLabel} · EXERCISE ${
    currentExerciseIndex + 1
  } OF ${selectedGroup.children.length}`;
  const eyebrow = isWorkoutComplete
    ? "WORKOUT COMPLETE"
    : isResting
      ? `UP NEXT · ${stepHeading}`
      : isExerciseTimerActive
        ? `WORKING NOW · ${stepHeading}`
        : stepHeading;

  return (
    <section
      className={`execution-focus mode-blocks timeline-color-${selectedColorIndex}`}
      aria-live="polite"
    >
      <div className="execution-focus-timer-container">
        <ExerciseTimerControls
          startSeconds={startSeconds}
          startLabel={startLabel}
          stepKey={focusStep.key}
          restSeconds={restSeconds}
          isExerciseTimer={hasExerciseTimer}
          execution={execution}
        />
      </div>

      <FocusedExerciseDetails
        workoutName={workoutName}
        exercise={focusStep.exercise}
        eyebrow={eyebrow}
        detail={selectedGroup.label}
      />

      <WorkoutStepMarkers
        steps={selectedGroup.children}
        focusStep={focusStep}
        completed={completed}
        isResting={isResting}
        label={`${repetitionLabel} exercises`}
        groupLabel={selectedGroup.label}
        completeAllLabel={completeAllLabel}
        onToggleStep={onToggleStep}
        onCompleteAll={onCompleteAll}
        onStartTimer={execution.startTimer}
      />
    </section>
  );
}
