import type {
  TimelineRow,
  TimelineStep,
  TimelineStatus,
} from "../shared/timelineTypes";

export function applyStepStatuses(
  rows: TimelineRow[],
  currentStepKey: string | undefined,
  completed: Record<string, boolean>,
): TimelineRow[] {
  return rows.map((row) => ({
    ...row,
    groups: row.groups.map((group) => {
      const children = group.children.map((step) => ({
        ...step,
        status: getStepStatus(
          step.key,
          currentStepKey,
          completed,
        ),
      }));

      return {
        ...group,
        children,
        status: getGroupStatus(children),
      };
    }),
  }));
}

function getGroupStatus(
  children: TimelineStep[],
): TimelineStatus {
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