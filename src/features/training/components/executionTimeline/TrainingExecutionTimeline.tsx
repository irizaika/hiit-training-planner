import type { TrainingWorkout } from "../../../../models/workout";
import type { TrainingExecutionState } from "../../hooks/useTrainingExecution";
// import { BlockExecutionTimeline } from "./blocks/BlockExecutionTimeline";
import { SetsWorkoutTimeline } from "./sets/SetsWorkoutTimeline";
// Preserve cascade: shared layout, navigation, then mode-specific focus overrides.
import "./shared/styles/ExecutionTimeline.css";
import "./shared/styles/ExecutionTimelineNavigation.css";
import "./shared/styles/ExecutionTimelineFocus.css";

interface TrainingExecutionTimelineProps {
  workout: TrainingWorkout;
  execution: TrainingExecutionState;
}

export function TrainingExecutionTimeline(props: TrainingExecutionTimelineProps) {
  if (props.workout.mode === "sets") {
    return <SetsWorkoutTimeline {...props} workout={props.workout} />;
  }

  // return <BlockExecutionTimeline {...props} workout={props.workout} />;
  return null;
}
