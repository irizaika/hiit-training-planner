import type { HiitWorkout } from "../../models/workout";
import { TIMER_PHASE, type TimerPhase } from "../../models/timer";
import {formatTime} from "../../utils/time";

interface TimerHeaderProps {
  workout: HiitWorkout;
  phase: TimerPhase;
  totalRounds: number;
  totalTime: number;
  onRestart?: () => void;
}

export function TimerHeader({
  workout,
  phase,
  totalRounds,
  totalTime, 
  onRestart
}: TimerHeaderProps) {

  return (
    <div className="timer-header">
      <div className="timer-workout-details">
        <p className="eyebrow">
          {phase === TIMER_PHASE.IDLE && "READY TO TRAIN"}
          {phase === TIMER_PHASE.COUNTDOWN && "GET READY"}
          {phase === TIMER_PHASE.WORK && "WORK"}
          {phase === TIMER_PHASE.REST && "REST"}
          {phase === TIMER_PHASE.ROUND_REST && "ROUND COMPLETED, REST"}
          {phase === TIMER_PHASE.FREEZE && "PAUSED"}
          {phase === TIMER_PHASE.FINISHED && "WORKOUT COMPLETE"}
        </p>

        <h4>{workout.name}</h4>

        <div className="timer-workout-meta">
          <span>{workout.workSeconds}s work</span>
          <span>{workout.restSeconds}s rest</span>
          <span>{totalRounds} rounds</span>
          <span>
            {formatTime(totalTime)} total time
          </span>
        </div>
      </div>

      <button
        type="button"
        className="timer-menu-button"
        aria-label="Edit workout"
        onClick={onRestart}
      > 
        ↻
      </button>
    </div>
  );
}
