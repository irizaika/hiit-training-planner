import type { SetsWorkout } from "../../../../models/workout";
import { ExerciseTarget } from "./ExerciseTarget";
import { ExecutionExercise } from "./ExecutionExercise";
import { RestAction } from "./RestAction";
import "./ExecutionGroups.css";

interface SetsExecutionListProps {
  workout: SetsWorkout;
  completed: Record<string, boolean>;
  onToggle: (key: string) => void;
  onToggleGroup: (keys: string[]) => void;
  onStartTimer: (label: string, seconds: number) => void;
}

export function SetsExecutionList({
  workout,
  completed,
  onToggle,
  onToggleGroup,
  onStartTimer,
}: SetsExecutionListProps) {
  return (
    <div className="execution-groups">
      {workout.exercises.map((exercise, exerciseIndex) => {
        const setKeys = Array.from(
          { length: exercise.sets },
          (_, setIndex) => `set:${exerciseIndex}:${setIndex}`,
        );
        const completedSets = setKeys.filter((key) => completed[key]).length;

        return (
          <details
            className="execution-group"
            key={exercise.id}
            open={exerciseIndex === 0}
          >
            <summary className="execution-group-summary">
              <div className="execution-summary-copy">
                <p className="execution-kicker">EXERCISE {exerciseIndex + 1}</p>
                <h3>{exercise.name || "Unnamed exercise"}</h3>
                <div className="execution-summary-meta">
                  <ExerciseTarget exercise={exercise} />
                  <span>
                    {completedSets}/{setKeys.length} sets
                  </span>
                </div>
              </div>
              <span className="execution-chevron" aria-hidden="true">
                ⌄
              </span>
            </summary>

            <div className="execution-group-content">
              <button
                type="button"
                className="execution-complete-group"
                onClick={() => onToggleGroup(setKeys)}
              >
                {setKeys.every((key) => completed[key])
                  ? "Undo exercise"
                  : "Complete exercise"}
              </button>

              <div className="execution-items">
                {setKeys.map((key, setIndex) => {
                  const restAfter =
                    setIndex < setKeys.length - 1
                      ? exercise.restBetweenSets
                      : workout.exercises[exerciseIndex + 1]
                        ? workout.restBetweenExercises
                        : undefined;

                  return (
                    <div className="execution-item-wrap" key={key}>
                      <ExecutionExercise
                        exercise={exercise}
                        label={`Set ${setIndex + 1}`}
                        completed={Boolean(completed[key])}
                        onToggle={() => onToggle(key)}
                        onStartTimer={() =>
                          onStartTimer(
                            `${exercise.name} · Set ${setIndex + 1}`,
                            exercise.timer?.enabled
                              ? exercise.timer.seconds
                              : 0,
                          )
                        }
                      />
                      <RestAction rest={restAfter} onStart={onStartTimer} />
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
