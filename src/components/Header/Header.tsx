import {
  routes,
  type AppRoute,
} from "../../app/routes";
import "./Header.css";

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export function Header({
  currentRoute,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="app-header">
      <button
        className="logo"
        type="button"
        onClick={() => onNavigate(routes.home)}
      >
        <span className="logo-mark">⚡</span>
        <span>HIIT Planner</span>
      </button>

      <nav className="navigation" aria-label="Main navigation">
        <button
          type="button"
          className={currentRoute === routes.home ? "active" : ""}
          onClick={() => onNavigate(routes.home)}
        >
          Home
        </button>

        <button
          type="button"
          className={currentRoute === routes.hiit ? "active" : ""}
          onClick={() => onNavigate(routes.hiit)}
        >
          HIIT
        </button>

        <button
          type="button"
          className={currentRoute === routes.rounds ? "active" : ""}
          onClick={() => onNavigate(routes.rounds)}
        >
          Rounds
        </button>

        <button
          type="button"
          className={currentRoute === routes.sets ? "active" : ""}
          onClick={() => onNavigate(routes.sets)}
        >
          Sets
        </button>
      </nav>
    </header>
  );
}