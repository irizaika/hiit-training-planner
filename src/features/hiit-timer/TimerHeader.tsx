import type { HiitWorkout } from "../../models/workout";
import type { TimerPhase } from "../../models/timer";

interface TimerHeaderProps {
  workout: HiitWorkout;
  phase: TimerPhase;
  totalRounds: number;
  totalTime: number;
  onEdit: () => void;
}

export function TimerHeader({
  workout,
  phase,
  totalRounds,
  totalTime,
  onEdit,
}: TimerHeaderProps) {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div className="timer-header">
      <div className="timer-workout-details">
        <p className="eyebrow">
          {phase === "idle" && "READY TO TRAIN"}
          {phase === "countdown" && "GET READY"}
          {phase === "work" && "WORK"}
          {phase === "rest" && "REST"}
          {phase === "freeze" && "PAUSED"}
          {phase === "finished" && "WORKOUT COMPLETE"}
        </p>

        <h4>{workout.name}</h4>

        <div className="timer-workout-meta">
          <span>{workout.workSeconds}s work</span>
          <span>{workout.restSeconds}s rest</span>
          <span>{totalRounds} rounds</span>
          <span>
            {minutes}:{String(seconds).padStart(2, "0")} total time
          </span>
        </div>
      </div>

      <button
        type="button"
        className="timer-menu-button"
        aria-label="Edit workout"
        onClick={onEdit}
      >
        ···
      </button>
    </div>
  );
}
