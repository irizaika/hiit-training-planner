import type { Exercise } from "../../models/exercise";
import { TIMER_PHASE, type TimerPhase } from "../../models/timer";

interface ExerciseProgressProps {
  exercises: Exercise[];
  currentExercise: number;
  totalExercises: number;
  phase: TimerPhase;
  isExerciseCompleted: (index: number) => boolean;
}

export function ExerciseProgress({
  exercises,
  currentExercise,
  totalExercises,
  phase,
  isExerciseCompleted,
}: ExerciseProgressProps) {
  return (
    <div className="exercise-progress">
      <div className="exercise-progress-header">
        <span>
          Exercise {currentExercise + 1} / {totalExercises}
        </span>
      </div>

      <div className="exercise-list">
        {exercises.map((exercise, index) => {
          const isCurrent =
            index === currentExercise &&
            phase !== TIMER_PHASE.FINISHED;

          const isCompleted = isExerciseCompleted(index);

          return (
            <div
              key={exercise.id}
              className={[
                "exercise-item",
                isCurrent && "is-current",
                isCompleted && "is-completed",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="exercise-status">
                {isCompleted ? "✓" : isCurrent ? "●" : "○"}
              </span>

              <span className="exercise-name">
                {exercise.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
