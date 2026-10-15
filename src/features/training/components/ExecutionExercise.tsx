import type { WorkoutExercise } from "../../../models/workout";
import { formatTime } from "../../../utils/time";
import { ExerciseTarget } from "./ExerciseTarget";
import "./ExecutionExercise.css";

export interface ExecutionExerciseProps {
  exercise: WorkoutExercise;
  label: string;
  completed: boolean;
  onToggle: () => void;
  onStartTimer: () => void;
}

export function ExecutionExercise({
  exercise,
  label,
  completed,
  onToggle,
  onStartTimer,
}: ExecutionExerciseProps) {
  return (
    <div className={`execution-item ${completed ? "is-complete" : ""}`}>
      <label className="execution-checkbox">
        <input type="checkbox" checked={completed} onChange={onToggle} />
        <span className="execution-item-label">{label}</span>
      </label>
      <div className="execution-item-details">
        <ExerciseTarget exercise={exercise} />
        {exercise.timer?.enabled && (
          <button
            type="button"
            className="execution-action-button"
            onClick={onStartTimer}
          >
            Start {formatTime(exercise.timer.seconds)} timer
          </button>
        )}
      </div>
    </div>
  );
}
