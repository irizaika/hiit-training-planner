import { useEffect, useState } from "react";
import "./App.css";
import { getCurrentRoute, navigateTo, routes, type AppRoute } from "./routes";
import { HiitTimerPage } from "../features/hiit-timer/HiitTimerPage";
import { RoundsPage } from "../features/rounds/RoundsPage";
import { SetsPage } from "../features/sets/SetsPage";
import { HomePage } from "../features/home/HomePage";
import { Header } from "../components/Header/Header";

function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getCurrentRoute());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (route: AppRoute) => {
    navigateTo(route);
    setCurrentRoute(route);
  };

  const pages = {
    [routes.home]: <HomePage onNavigate={navigate} />,
    [routes.hiit]: <HiitTimerPage /*onNavigate={navigate}*/ />,
    [routes.rounds]: <RoundsPage />,
    [routes.sets]: <SetsPage />,
    [routes.hiitCreate]: <SetsPage />,
    [routes.hiitTimer]: <SetsPage />,

  };

  return (
    <div className="app">
      <Header currentRoute={currentRoute} onNavigate={navigate} />

      <main className="main">{pages[currentRoute]}</main>
    </div>
  );
}

export default App;
