import type { TimelineGroup } from "./timelineTypes";

interface WorkoutGroupMarkerProps {
  column: TimelineGroup;
  index: number;
  isSelected: boolean;
  onSelect: (columnKey: string) => void;
}

export function WorkoutGroupMarker({
  column,
  index,
  isSelected,
  onSelect,
}: WorkoutGroupMarkerProps) {
  
  // class name
  const className = [
    "execution-timeline-column",
    `is-${column.status}`,
    isSelected ? "is-selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={className}
      aria-current={column.status === "current" ? "step" : undefined}
    >
      <button
        type="button"
        className="execution-timeline-select"
        aria-expanded={isSelected}
        aria-label={`Show ${column.label}`}
        onClick={() => onSelect(column.key)}
      >
        <span className="execution-timeline-main-marker" aria-hidden="true">
          {column.status === "completed" ? "✓" : index + 1}
        </span>
        <span className="execution-timeline-column-label">{column.label}</span>
        <span className="execution-timeline-column-detail">
          {column.detail}
        </span>
      </button>
    </li>
  );
}
