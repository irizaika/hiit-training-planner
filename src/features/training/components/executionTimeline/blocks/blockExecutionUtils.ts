
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import type { TimelineStep } from "../shared/timelineTypes";

export function getRepetitionNumber(label: string): number {
  return Number(label.split(" ").at(-1)) || 1;
}

export function startRestAfter(
  step: TimelineStep,
  execution: TrainingExecutionState,
): void {
  const rest = step.restAfter;
  if (rest?.enabled && rest.seconds > 0) {
    execution.startTimer("Rest", rest.seconds);
  }
}
