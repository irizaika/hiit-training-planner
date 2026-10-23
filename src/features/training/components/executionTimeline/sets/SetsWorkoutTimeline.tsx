import { Fragment, useState } from "react";
import type { SetsWorkout } from "../../../../../models/workout";
import type { TrainingExecutionState } from "../../../hooks/useTrainingExecution";
import { WorkoutProgress } from "../../../../../components/Progress/WorkoutProgress";
import { RestTimerMarker } from "../shared/RestTimerMarker";
import { WorkoutGroupMarker } from "../shared/WorkoutGroupMarker";
import type { TimelineStep } from "../shared/timelineTypes";
import { SetsWorkoutFocus } from "./SetsWorkoutFocus";
import {
  applyStepStatuses,
  buildExerciseGroups,
  getFocusStep,
  getRestSeconds,
  getSelectedGroup,
} from "./setsTimelineModel";

interface SetsWorkoutTimelineProps {
  workout: SetsWorkout;
  execution: TrainingExecutionState;
}

export function SetsWorkoutTimeline({
  workout,
  execution,
}: SetsWorkoutTimelineProps) {
  const [selection, setSelection] = useState<{
    groupKey: string;
    currentStepKey: string | undefined;
  } | null>(null);

  const groups = buildExerciseGroups(workout, execution);
  const groupsWithStatus = applyStepStatuses(
    groups,
    execution.currentStepKey,
    execution.completed,
  );

  const selectedGroup = getSelectedGroup(
    groupsWithStatus,
    selection?.currentStepKey === execution.currentStepKey
      ? (selection?.groupKey ?? null)
      : null,
  );

  const total = execution.exerciseKeys.length;
  const completedCount = execution.completedCount;

  if (!selectedGroup || selectedGroup.children.length === 0 || total === 0) {
    return null;
  }

  const focusStep = getFocusStep(selectedGroup);

  const restSeconds = getRestSeconds(focusStep);

  const toggleStep = (step: TimelineStep) => {
    if (
      execution.timer?.purpose === "rest" &&
      execution.timer.remainingSeconds > 0
    ) {
      return;
    }

    const isCompleting = !execution.completed[step.key];
    execution.toggleCompleted(step.key);

    if (isCompleting) {
      const rest = step.restAfter;
      if (rest?.enabled && rest.seconds > 0) {
        execution.startTimer("Rest", rest.seconds);
      }
    }
  };

  return (
    <section
      className="execution-timeline mode-sets"
      aria-label="Workout timeline"
    >
      <SetsWorkoutFocus
        completedCount={completedCount}
        execution={execution}
        focusStep={focusStep}
        onToggleStep={toggleStep}
        restSeconds={restSeconds}
        selectedGroup={selectedGroup}
        total={total}
        workoutName={workout.name}
      />
      <WorkoutProgress
        className="execution-workout-progress"
        current={completedCount}
        total={total}
        progress={execution.progress}
        label="Set"
      />

      <div className="execution-timeline-rows">
        <div className="execution-timeline-row timeline-color-0">
          <h4 className="execution-timeline-row-label">Exercises</h4>

          <ol className="execution-timeline-columns">
            {groupsWithStatus.map((group, index) => (
              <Fragment key={group.key}>
                <WorkoutGroupMarker
                  column={group}
                  index={index}
                  isSelected={group.key === selectedGroup.key}
                  onSelect={(groupKey) =>
                    setSelection({
                      groupKey,
                      currentStepKey: execution.currentStepKey,
                    })
                  }
                />
                <RestTimerMarker
                  label={group.label}
                  onStart={execution.startTimer}
                  restAfter={group.children.at(-1)?.restAfter}
                />
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
