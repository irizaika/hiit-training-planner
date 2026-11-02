import type { RestConfig } from "../../../../../models/workout";
import { formatTime } from "../../../../../utils/time";

interface RestTimerMarkerProps {
  restAfter?: RestConfig;
  label: string;
  onStart: (label: string, seconds: number) => void;
}

export function RestTimerMarker({
  restAfter,
  label,
  onStart,
}: RestTimerMarkerProps) {
  if (!restAfter?.enabled || restAfter.seconds <= 0) {
    return null;
  }

  return (
    <li className="execution-timeline-rest-marker">
      <button
        type="button"
        title={`Start ${formatTime(restAfter.seconds)} rest`}
        aria-label={`Start ${formatTime(restAfter.seconds)} rest after ${label}`}
        onClick={() => onStart(`Rest after ${label}`, restAfter.seconds)}
      >
        <span aria-hidden="true">◷</span>
        <span>{formatTime(restAfter.seconds)}</span>
      </button>
    </li>
  );
}
