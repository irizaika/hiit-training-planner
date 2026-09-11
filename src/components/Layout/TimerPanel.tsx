
import { type ReactNode } from "react";
import type { Workout } from "../../models/workout";
import "./TimerPanel.css";

interface TimerPanelProps {
  selectedWorkout?: Workout;
  children: ReactNode;
}

export function TimerPanel({ selectedWorkout, children }: TimerPanelProps) {

    return (
        <section className="timer-panel">
          {!selectedWorkout ? (
            <div className="timer-empty">
              <div className="timer-empty-icon">◷</div>

              <p className="eyebrow">TIMER</p>

              <h2>Select a workout</h2>

              <p>Choose a workout from the list to get ready to train.</p>
            </div>
          ) : (
            children
          )}
        </section>
    );
}