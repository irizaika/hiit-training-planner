import type { ReactNode } from "react";
import "./WorkoutPanel.css";
interface WorkoutPanelProps {
  name: string;
  count: number;
  children: ReactNode;
  onCreate?: () => void;
  onImport?: () => void;
  onExport?: () => void;
}
export function WorkoutPanel({
  name,
  count,
  children,
  onCreate,
  onImport,
  onExport,
}: WorkoutPanelProps) {
  return (
    <section className="workout-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{name}</p>
          <h1>My Workouts</h1>
        </div>
        <span className="workout-count">{count}</span>
      </div>
      <div className="workout-list-container">{children}</div>
      <div className="workout-actions">
        <button type="button" className="primary-button" onClick={onCreate}>
          + Add workout
        </button>
        <button type="button" className="secondary-button" onClick={onImport}>
          ↑ Bring workouts
        </button>
        <button type="button" className="secondary-button" onClick={onExport}>
          ↓ Save backup
        </button>
      </div>
    </section>
  );
}
