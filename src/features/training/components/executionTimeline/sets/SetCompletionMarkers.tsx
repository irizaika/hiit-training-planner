import { Fragment } from "react";
import type { TimelineStep } from "../shared/timelineTypes";
import { RestTimerMarker } from "../shared/RestTimerMarker";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import { SetCompletionButton } from "./SetCompletionButton";

interface SetCompletionMarkersProps {
  steps: TimelineStep[];
  focusStep: TimelineStep;
  completed: Record<string, boolean>;
  isResting: boolean;
  onToggleStep: (step: TimelineStep) => void;
  execution: TrainingExecutionState;
}

export function SetCompletionMarkers({
  steps,
  focusStep,
  completed,
  isResting,
  onToggleStep,
  execution,
}: SetCompletionMarkersProps) {
  return (
    <ol className="execution-focus-set-list" aria-label="Exercise sets">
      {steps.map((step, index) => {
        const isCompleted = completed[step.key];
        const isCurrent = step.key === focusStep.key && !isCompleted;

        return (
          <Fragment key={step.key}>
            <li>
              <SetCompletionButton
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
              onStart={execution.startTimer}
              restAfter={step.restAfter}
            />
          </Fragment>
        );
      })}
    </ol>
  );
}