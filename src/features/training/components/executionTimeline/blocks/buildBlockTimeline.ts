import type { TrainingWorkout, WorkoutBlock } from "../../../../../models/workout";
import type {
  TimelineGroup,
  TimelineRow,
  TimelineStep,
} from "../shared/timelineTypes";

type BlockWorkout = Extract<
  TrainingWorkout,
  { mode: "circular" | "supersets" }
>;

/** Builds timeline rows for every block in a circular or superset workout. */
export function buildBlockTimeline(
  workout: BlockWorkout,
  completed: Record<string, boolean>,
): TimelineRow[] {
  return workout.blocks.map((block, blockIndex) =>
    buildBlockRow(workout, block, blockIndex, completed),
  );
}

/** Builds one block row and creates a group for each round or repeat. */
function buildBlockRow(
  workout: BlockWorkout,
  block: WorkoutBlock,
  blockIndex: number,
  completed: Record<string, boolean>,
): TimelineRow {
  const isSuperset = workout.mode === "supersets";

  return {
    key: `block:${blockIndex}`,
    label: isSuperset
      ? block.name || `Superset ${blockIndex + 1}`
      : "Rounds",
    detail: isSuperset
      ? `${block.repeatCount} ${
          block.repeatCount === 1 ? "repeat" : "repeats"
        }`
      : undefined,
    colorIndex: blockIndex % 5,
    groups: Array.from({ length: block.repeatCount }, (_, repeatIndex) =>
      buildRepeatGroup(
        workout.mode,
        block,
        blockIndex,
        repeatIndex,
        completed,
      ),
    ),
  };
}

/** Builds one round/repeat group and derives its status from its exercises. */
function buildRepeatGroup(
  mode: BlockWorkout["mode"],
  block: WorkoutBlock,
  blockIndex: number,
  repeatIndex: number,
  completed: Record<string, boolean>,
): TimelineGroup {
  const children = block.exercises.map((_, exerciseIndex) =>
    buildExerciseStep(
      block,
      blockIndex,
      repeatIndex,
      exerciseIndex,
      completed,
    ),
  );
  const isCircular = mode === "circular";

  return {
    key: `block:${blockIndex}:repeat:${repeatIndex}`,
    label: `${isCircular ? "Round" : "Repeat"} ${repeatIndex + 1}`,
    detail: `${children.length} ${
      children.length === 1 ? "exercise" : "exercises"
    }`,
    children,
    status: children.every((step) => step.status === "completed")
      ? "completed"
      : "upcoming",
  };
}

/** Builds an exercise step and assigns the rest that follows it, if any. */
function buildExerciseStep(
  block: WorkoutBlock,
  blockIndex: number,
  repeatIndex: number,
  exerciseIndex: number,
  completed: Record<string, boolean>,
): TimelineStep {
  const exercise = block.exercises[exerciseIndex];
  const key =
    `block:${blockIndex}:repeat:${repeatIndex}:exercise:${exerciseIndex}`;
  const isLastExercise = exerciseIndex === block.exercises.length - 1;
  const isLastRepeat = repeatIndex === block.repeatCount - 1;
  const restAfter = isLastExercise
    ? isLastRepeat
      ? undefined
      : block.restBetweenRepeats
    : block.restBetweenExercises;

  return {
    key,
    label: exercise.name || `Exercise ${exerciseIndex + 1}`,
    exercise,
    restAfter,
    status: completed[key] ? "completed" : "upcoming",
  };
}
