import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import { WorkoutStepList } from "./WorkoutStepList";
import { WorkoutStepHeading } from "./WorkoutStepHeading";
import type { TimelineStep } from "./timelineTypes";

interface WorkoutStepMarkersProps {
  steps: TimelineStep[];
  focusStep: TimelineStep;
  completed: Record<string, boolean>;
  isResting: boolean;
  label: string;
  groupLabel?: string;
  completeAllLabel?: string;
  onToggleStep: (step: TimelineStep) => void;
  onCompleteAll?: () => void;
  onStartTimer: TrainingExecutionState["startTimer"];
}

export function WorkoutStepMarkers(
  props: WorkoutStepMarkersProps,
) {
  const {
    steps,
    focusStep,
    completed,
    isResting,
    label,
    groupLabel,
    completeAllLabel,
    onToggleStep,
    onCompleteAll,
    onStartTimer,
  } = props;

  const completedCount = steps.filter(
    (step) => completed[step.key],
  ).length;

  return (
    <div className="execution-focus-step-section">
      <WorkoutStepHeading
        groupLabel={groupLabel}
        completedCount={completedCount}
        total={steps.length}
        completeAllLabel={completeAllLabel}
        isResting={isResting}
        onCompleteAll={onCompleteAll}
      />

      <WorkoutStepList
        steps={steps}
        focusStep={focusStep}
        completed={completed}
        isResting={isResting}
        label={label}
        onToggleStep={onToggleStep}
        onStartTimer={onStartTimer}
      />
    </div>
  );
}