import { Fragment } from "react";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import { StepCompletionButton } from "./StepCompletionButton";
import { RestTimerMarker } from "./RestTimerMarker";
import type { TimelineStep } from "./timelineTypes";

interface WorkoutStepListProps {
  steps: TimelineStep[];
  focusStep: TimelineStep;
  completed: Record<string, boolean>;
  isResting: boolean;
  label: string;
  onToggleStep: (step: TimelineStep) => void;
  onStartTimer: TrainingExecutionState["startTimer"];
}

export function WorkoutStepList({
  steps,
  focusStep,
  completed,
  isResting,
  label,
  onToggleStep,
  onStartTimer,
}: WorkoutStepListProps) {
  return (
    <ol
      className="execution-focus-step-list"
      aria-label={label}
    >
      {steps.map((step, index) => {
        const isCompleted = Boolean(completed[step.key]);
        const isCurrent =
          step.key === focusStep.key && !isCompleted;

        return (
          <Fragment key={step.key}>
            <li>
              <StepCompletionButton
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                disabled={isResting}
                onToggleStep={onToggleStep}
                step={step}
                index={index}
              />
            </li>

            <RestTimerMarker
              label={step.exercise.name}
              onStart={onStartTimer}
              restAfter={step.restAfter}
            />
          </Fragment>
        );
      })}
    </ol>
  );
}
