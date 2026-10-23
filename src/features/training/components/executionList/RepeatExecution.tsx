import type { TrainingWorkout, WorkoutBlock } from "../../../../models/workout";
import { ExecutionExercise } from "./ExecutionExercise";
import { RestAction } from "./RestAction";
import "./ExecutionGroups.css";

type BlockWorkout = Extract<TrainingWorkout, { mode: "circular" | "supersets" }>;

interface RepeatExecutionProps {
  block: WorkoutBlock;
  blockIndex: number;
  repeatIndex: number;
  mode: BlockWorkout["mode"];
  completed: Record<string, boolean>;
  onToggle: (key: string) => void;
  onToggleGroup: (keys: string[]) => void;
  onStartTimer: (label: string, seconds: number) => void;
}

export function RepeatExecution({
  block,
  blockIndex,
  repeatIndex,
  mode,
  completed,
  onToggle,
  onToggleGroup,
  onStartTimer,
}: RepeatExecutionProps) {
  const repeatKeys = getRepeatKeys(block, blockIndex, repeatIndex);
  const repeatLabel = mode === "circular" ? "Round" : "Repeat";
  const completedCount = repeatKeys.filter((key) => completed[key]).length;

  return (
    <details
      className="execution-repeat"
      open={repeatIndex === 0}
    >
      <summary className="execution-repeat-summary">
        <span>
          {repeatLabel} {repeatIndex + 1}
        </span>
        <span className="execution-summary-meta">
          {completedCount}/{repeatKeys.length} complete
        </span>
        <span className="execution-chevron" aria-hidden="true">
          ⌄
        </span>
      </summary>
      <div className="execution-repeat-content">
        <button
          type="button"
          className="execution-complete-group"
          onClick={() => onToggleGroup(repeatKeys)}
        >
          {repeatKeys.every((key) => completed[key])
            ? `Undo ${repeatLabel.toLowerCase()}`
            : `Complete ${repeatLabel.toLowerCase()}`}
        </button>

        {block.exercises.map((exercise, exerciseIndex) => {
          const key = repeatKeys[exerciseIndex];
          const isLastExercise = exerciseIndex === block.exercises.length - 1;
          const restAfterExercise = isLastExercise
            ? undefined
            : block.restBetweenExercises;
          const restAfterRepeat =
            isLastExercise && repeatIndex < block.repeatCount - 1
              ? block.restBetweenRepeats
              : undefined;

          return (
            <div className="execution-item-wrap" key={key}>
              <ExecutionExercise
                exercise={exercise}
                label={exercise.name || `Exercise ${exerciseIndex + 1}`}
                completed={Boolean(completed[key])}
                onToggle={() => onToggle(key)}
                onStartTimer={() =>
                  onStartTimer(
                    exercise.name || "Exercise timer",
                    exercise.timer?.enabled ? exercise.timer.seconds : 0,
                  )
                }
              />
              <RestAction
                rest={restAfterExercise ?? restAfterRepeat}
                onStart={onStartTimer}
              />
            </div>
          );
        })}
      </div>
    </details>
  );
}

function getRepeatKeys(
  block: WorkoutBlock,
  blockIndex: number,
  repeatIndex: number,
): string[] {
  return block.exercises.map(
    (_, exerciseIndex) =>
      `block:${blockIndex}:repeat:${repeatIndex}:exercise:${exerciseIndex}`,
  );
}
