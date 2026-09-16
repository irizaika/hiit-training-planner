import { TIMER_PHASE, type TimerPhase } from "../../../../models/timer";
import "./TimerControls.css"


interface TimerControlsProps {
  phase: TimerPhase;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
}

interface TimerButtonConfig {
  label: string;
  onClick: () => void;
}

export function TimerControls({
  phase,
  onStart,
  onPause,
  onResume,
}: TimerControlsProps) {

  const button = getTimerButton(phase, onStart, onPause, onResume);

  if (!button) {
    return null;
  }

  return (
    <button type="button" className="start-button" onClick={button.onClick}>
      {button.label}
    </button>
  );
}

function getTimerButton(
  phase: TimerPhase,
  onStart: () => void,
  onPause: () => void,
  onResume: () => void,
): TimerButtonConfig | null {
  switch (phase) {
    case TIMER_PHASE.IDLE:
      return { label: "START TIMER", onClick: onStart };

    case TIMER_PHASE.FINISHED:
      return { label: "START AGAIN", onClick: onStart };

    case TIMER_PHASE.COUNTDOWN:
    case TIMER_PHASE.WORK:
    case TIMER_PHASE.REST:
    case TIMER_PHASE.ROUND_REST:
      return { label: "PAUSE TIMER", onClick: onPause };

    case TIMER_PHASE.FREEZE:
      return { label: "RESUME TIMER", onClick: onResume };

    default:
      return null;
  }
}