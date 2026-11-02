import type { TrainingWorkout, WorkoutBlock } from "../../../../models/workout";
import { RepeatExecution } from "./RepeatExecution";
import "./ExecutionGroups.css";

type BlockWorkout = Extract<TrainingWorkout, { mode: "circular" | "supersets" }>;

interface BlockExecutionListProps {
  workout: BlockWorkout;
  completed: Record<string, boolean>;
  onToggle: (key: string) => void;
  onToggleGroup: (keys: string[]) => void;
  onStartTimer: (label: string, seconds: number) => void;
  getBlockKeys: (block: WorkoutBlock, blockIndex: number) => string[];
}

export function BlockExecutionList({
  workout,
  completed,
  onToggle,
  onToggleGroup,
  onStartTimer,
  getBlockKeys,
}: BlockExecutionListProps) {
  return (
    <div className="execution-groups">
      {workout.blocks.map((block, blockIndex) => {
        
        // Create an array of repeat indexes based on the block's repeat count
        const repeatIndexes = Array.from(
          { length: block.repeatCount },
          (_, index) => index,
        ); 

        // Map over the repeat indexes to create RepeatExecution components for each repeat
        const repeats = repeatIndexes.map((repeatIndex) => (
          <RepeatExecution
            key={repeatIndex}
            block={block}
            blockIndex={blockIndex}
            repeatIndex={repeatIndex}
            mode={workout.mode}
            completed={completed}
            onToggle={onToggle}
            onToggleGroup={onToggleGroup}
            onStartTimer={onStartTimer}
          />
        ));

        if (workout.mode === "circular") {
          return (
            <section className="execution-group" key={block.id}>
              {repeats}
            </section>
          );
        }

        const blockKeys = getBlockKeys(block, blockIndex);
        const completedCount = blockKeys.filter((key) => completed[key]).length;

        return (
          <details
            className="execution-group"
            key={block.id}
            open={blockIndex === 0}
          >
            <summary className="execution-group-summary">
              <div className="execution-summary-copy">
                <p className="execution-kicker">BLOCK {blockIndex + 1}</p>
                <h3>{block.name || `Block ${blockIndex + 1}`}</h3>
                <div className="execution-summary-meta">
                  <span>{block.repeatCount} repeats</span>
                  <span>{block.exercises.length} exercises</span>
                  <span>
                    {completedCount}/{blockKeys.length} complete
                  </span>
                </div>
              </div>
              <span className="execution-chevron" aria-hidden="true">
                ⌄
              </span>
            </summary>
            <div className="execution-group-content">{repeats}</div>
          </details>
        );
      })}
    </div>
  );
}
