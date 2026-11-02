import type { HiitWorkout } from "../../../../models/workout";
import { TIMER_PHASE, type TimerPhase } from "../../../../models/timer";
import { formatTime } from "../../../../utils/time";
import { WorkoutHeader } from "../../../../components/WorkoutHeader";

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
  onRestart,
}: TimerHeaderProps) {
  return (
    <WorkoutHeader
      status={getTimerStatus(phase)}
      title={workout.name}
      meta={
        <>
          <span>{totalRounds} rounds</span>
          <span className="separator">·</span>
          <span>{formatTime(totalTime)} total</span>
        </>
      }
      details={
        <>
          <span>{workout.workSeconds}s work</span>
          {workout.restEnabled && (
            <>
              <span className="separator">·</span>
              <span>{workout.restSeconds}s rest</span>
            </>
          )}
          {workout.roundRestEnabled && (
            <>
              <span className="separator">·</span>
              <span>{workout.roundRestSeconds}s round rest</span>
            </>
          )}
        </>
      }
      action={
        <button
          type="button"
          className="timer-menu-button"
          aria-label="Restart workout"
          onClick={onRestart}
        >
          ↻
        </button>
      }
    />
  );
}

function getTimerStatus(phase: TimerPhase): string {
  switch (phase) {
    case TIMER_PHASE.IDLE:
      return "READY TO TRAIN";
    case TIMER_PHASE.COUNTDOWN:
      return "GET READY";
    case TIMER_PHASE.WORK:
      return "WORK";
    case TIMER_PHASE.REST:
      return "REST";
    case TIMER_PHASE.ROUND_REST:
      return "ROUND COMPLETED, REST";
    case TIMER_PHASE.FREEZE:
      return "PAUSED";
    case TIMER_PHASE.FINISHED:
      return "WORKOUT COMPLETE";
  }
}
