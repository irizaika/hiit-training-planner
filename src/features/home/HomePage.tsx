import {
  routes,
  type AppRoute,
} from "../../app/routes";
import { WorkoutOption } from "./WorkoutOption/WorkoutOption";
import { WorkoutLibraryActions } from "./WorkoutLibraryActions/WorkoutLibraryActions";
import "./HomePage.css";

export interface HomePageProps {
  onNavigate: (route: AppRoute) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">TRAIN • TRACK • REPEAT</p>

        <h1>
          Your workout.
          <br />
          Your pace.
        </h1>

        <p className="hero-description">
          Create simple workouts and use your phone or laptop as your
          personal training timer.
        </p>
      </div>

      <div className="workout-options">
        <WorkoutOption
          icon="⏱"
          title="HIIT Timer"
          description="Simple work and rest intervals."
          onClick={() => onNavigate(routes.hiit)}
        />

        <WorkoutOption
          icon="♻️"
          title="Rounds"
          description="Combine several exercises into rounds."
          onClick={() => onNavigate(routes.rounds)}
        />

        <WorkoutOption
          icon="🏋"
          title="Sets"
          description="Create traditional exercise sets."
          onClick={() => onNavigate(routes.sets)}
        />
      </div>

      <WorkoutLibraryActions />
    </section>
  );
}
