import { useState } from "react";
import type { TrainingWorkout } from "../../../../../models/workout";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import { WorkoutProgress } from "../../../../../components/Progress/WorkoutProgress";
import { WorkoutGroupMarker } from "../shared/WorkoutGroupMarker";
import type { TimelineStep } from "../shared/timelineTypes";
import { BlockWorkoutFocus } from "./BlockWorkoutFocus";
import { buildBlockTimeline} from "./buildBlockTimeline"
import { applyStepStatuses } from "./timelineStatus";
import { getRepetitionNumber, startRestAfter } from "./blockExecutionUtils";

type BlockWorkout = Extract<
  TrainingWorkout,
  { mode: "circular" | "supersets" }
>;

interface BlockExecutionTimelineProps {
  workout: BlockWorkout;
  execution: TrainingExecutionState;
}

export function BlockExecutionTimeline({
  workout,
  execution,
}: BlockExecutionTimelineProps) {
  const [selection, setSelection] = useState<{
    groupKey: string;
    currentStepKey: string | undefined;
  } | null>(null);
  const { completed, currentStepKey } = execution;

  const rows = buildBlockTimeline(workout, completed);

  const rowsWithStatus = applyStepStatuses(rows, currentStepKey, completed);

  const groups = rows.flatMap((row) => row.groups);
  const steps = groups.flatMap((group) => group.children);

  const groupsWithStatus = rowsWithStatus.flatMap((row) => row.groups);
  const selectedGroup =
    (selection && selection.currentStepKey === currentStepKey
      ? groupsWithStatus.find((group) => group.key === selection.groupKey)
      : undefined) ??
    groupsWithStatus.find((group) =>
      group.children.some((step) => step.status !== "completed"),
    ) ??
    groupsWithStatus.at(-1);
  const selectedRow = selectedGroup
    ? rowsWithStatus.find((row) =>
        row.groups.some((group) => group.key === selectedGroup.key),
      )
    : undefined;
  const completedCount = steps.filter((step) => completed[step.key]).length;
  const total = steps.length;

  if (!selectedGroup || selectedGroup.children.length === 0 || total === 0) {
    return null;
  }

  const focusStep =
    selectedGroup.children.find((step) => step.status === "current") ??
    selectedGroup.children.find((step) => step.status !== "completed") ??
    selectedGroup.children[0];
  const isResting =
    execution.timer?.purpose === "rest" &&
    execution.timer.remainingSeconds > 0;
  const groupIsComplete = selectedGroup.children.every(
    (step) => completed[step.key],
  );
  const repetitionName = workout.mode === "circular" ? "round" : "repeat";
  const completeAllLabel = groupIsComplete
    ? `Undo ${repetitionName}`
    : `Complete ${repetitionName}`;
  const repetitionLabel =
    workout.mode === "circular"
      ? `ROUND ${getRepetitionNumber(selectedGroup.label)}`
      : `REPEAT ${getRepetitionNumber(selectedGroup.label)}`;

  const toggleStep = (step: TimelineStep) => {
    if (isResting) {
      return;
    }

    const isCompleting = !completed[step.key];
    execution.toggleCompleted(step.key);
    if (isCompleting) {
      startRestAfter(step, execution);
    }
  };

  const toggleGroup = () => {
    if (isResting) {
      return;
    }

    const isCompleting = !groupIsComplete;
    execution.toggleGroupCompleted(
      selectedGroup.children.map((step) => step.key),
    );
    if (isCompleting) {
      const lastStep = selectedGroup.children.at(-1);
      if (lastStep) {
        startRestAfter(lastStep, execution);
      }
    }
  };

  return (
    <section
      className={`execution-timeline mode-${workout.mode}`}
      aria-label="Workout timeline"
    >
      <BlockWorkoutFocus
        workoutName={workout.name}
        repetitionLabel={repetitionLabel}
        selectedGroup={selectedGroup}
        focusStep={focusStep}
        selectedColorIndex={selectedRow?.colorIndex ?? 0}
        completed={completed}
        execution={execution}
        isWorkoutComplete={completedCount === total}
        isResting={isResting}
        completeAllLabel={completeAllLabel}
        onToggleStep={toggleStep}
        onCompleteAll={toggleGroup}
      />

      <div className="execution-timeline-rows">
        <WorkoutProgress
          className="execution-workout-progress"
          current={completedCount}
          total={total}
          progress={execution.progress}
          label="Exercise"
        />
        <div className="execution-timeline-block-rows">
          {rowsWithStatus.map((row) => (
            <div
              className={`execution-timeline-row timeline-color-${row.colorIndex}`}
              key={row.key}
            >
              <h4 className="execution-timeline-row-label">
                {row.label}
                {row.detail && <span>{row.detail}</span>}
              </h4>
              <ol className="execution-timeline-columns">
                {row.groups.map((group, index) => (
                  <WorkoutGroupMarker
                    column={group}
                    index={index}
                    isSelected={group.key === selectedGroup.key}
                    key={group.key}
                    onSelect={(groupKey) =>
                      setSelection({ groupKey, currentStepKey })
                    }
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
