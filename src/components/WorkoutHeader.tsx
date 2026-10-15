import type { ReactNode } from "react";
import "./WorkoutHeader.css";

interface WorkoutHeaderProps {
  status: string;
  title: string;
  meta?: ReactNode;
  details?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function WorkoutHeader({
  status,
  title,
  meta,
  details,
  action,
  className,
}: WorkoutHeaderProps) {
  return (
    <header className={`timer-header ${className ?? ""}`}>
      <div className="timer-workout-details">
        <div className="timer-status-row">
          <p className="eyebrow">{status}</p>
        </div>

        <div className="row">
          <h4>{title}</h4>
          {meta && <div className="timer-workout-meta">{meta}</div>}
        </div>

        {details && (
          <div className="timer-workout-meta timer-workout-secondary-meta">
            {details}
          </div>
        )}
      </div>

      {action}
    </header>
  );
}
