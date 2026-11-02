import type { SetsWorkout } from "../../../../../models/workout";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import type {
  TimelineGroup,
  TimelineStep,
  TimelineStatus,
} from "../shared/timelineTypes";

// Build the exercise groups and their sets.
export function buildExerciseGroups(
  workout: SetsWorkout,
  execution: TrainingExecutionState,
): TimelineGroup[] {
  return workout.exercises.map((exercise, exerciseIndex) => {
    const children: TimelineStep[] = Array.from(
      { length: exercise.sets },
      (_, setIndex) => {
        const key = execution.setStepKeys[exerciseIndex][setIndex];

        return {
          key,
          label: `Set ${setIndex + 1}`,
          exercise,
          status: execution.completed[key] ? "completed" : "upcoming",
          restAfter: getRestAfter(
            workout,
            exerciseIndex,
            setIndex,
            exercise.sets,
          ),
        };
      },
    );

    return {
      key: `exercise:${exerciseIndex}`,
      label: exercise.name || `Exercise ${exerciseIndex + 1}`,
      detail: `${exercise.sets} ${exercise.sets === 1 ? "set" : "sets"}`,
      children,
      status: getGroupStatus(children),
    };
  });
}

function getRestAfter(
  workout: SetsWorkout,
  exerciseIndex: number,
  setIndex: number,
  setCount: number,
) {
  const exercise = workout.exercises[exerciseIndex];
  const isLastSet = setIndex === setCount - 1;
  const hasNextExercise = Boolean(workout.exercises[exerciseIndex + 1]);

  if (isLastSet) {
    return hasNextExercise ? workout.restBetweenExercises : undefined;
  }

  return exercise.restBetweenSets;
}

// Apply current, completed, and upcoming statuses to each step.
export function applyStepStatuses(
  groups: TimelineGroup[],
  currentStepKey: string | undefined,
  completed: Record<string, boolean>,
): TimelineGroup[] {
  return groups.map((group) => {
    const children = group.children.map((step): TimelineStep => ({
      ...step,
      status: getStepStatus(step.key, currentStepKey, completed),
    }));

    return {
      ...group,
      children,
      status: getGroupStatus(children),
    };
  });
}

function getGroupStatus(children: TimelineStep[]): TimelineStatus {
  if (children.every((step) => step.status === "completed")) {
    return "completed";
  }

  return children.some((step) => step.status === "current")
    ? "current"
    : "upcoming";
}

function getStepStatus(
  key: string,
  currentStepKey: string | undefined,
  completed: Record<string, boolean>,
): TimelineStatus {
  if (completed[key]) {
    return "completed";
  }

  return key === currentStepKey ? "current" : "upcoming";
}

// Find the selected group, or fall back to the first unfinished group.
export function getSelectedGroup(
  groups: TimelineGroup[],
  selectedGroupKey: string | null,
): TimelineGroup | undefined {
  return (
    groups.find((group) => group.key === selectedGroupKey) ??
    groups.find((group) =>
      group.children.some((step) => step.status !== "completed"),
    ) ??
    groups.at(-1)
  );
}

// Find the step that should be displayed in the focus panel.
export function getFocusStep(group: TimelineGroup): TimelineStep {
  return (
    group.children.find((step) => step.status === "current") ??
    group.children.find((step) => step.status !== "completed") ??
    group.children[0]
  );
}

export function getRestSeconds(
  step: TimelineStep,
): number | undefined {
  const rest = step.restAfter;

  return rest?.enabled && rest.seconds > 0
    ? rest.seconds
    : undefined;
}

// Check whether the group will be complete after this step is toggled.
export function isGroupCompleteAfterToggle(
  group: TimelineGroup,
  toggledStep: TimelineStep,
  completed: Record<string, boolean>,
): boolean {
  return group.children.every(
    (step) =>
      step.key === toggledStep.key || completed[step.key],
  );
}
