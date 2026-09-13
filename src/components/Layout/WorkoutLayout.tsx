import type { ReactNode } from "react";
import "./WorkoutLayout.css";

interface WorkoutLayoutProps {
  children: ReactNode;
}

export function WorkoutLayout({ children }: WorkoutLayoutProps) {
  return (
    <>
      <section className="workout-page">
        <div className="workout-layout">
          {children}
        </div>
      </section>
    </>
  );
}
