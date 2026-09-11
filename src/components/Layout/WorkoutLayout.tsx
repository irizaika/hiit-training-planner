import type { ReactNode } from "react";
import "./WorkoutLayout.css";

interface WorkoutLayoutProps {
  children: ReactNode;
}

export function WorkoutLayout({ children }: WorkoutLayoutProps) {
  return (
    <>
      <section className="hiit-page">
        <div className="hiit-layout">
          {children}
        </div>
      </section>
    </>
  );
}
