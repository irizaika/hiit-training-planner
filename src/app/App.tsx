import { useEffect, useState } from "react";
import "./App.css";
import { getCurrentRoute, navigateTo, routes, type AppRoute } from "./routes";
import { HiitTimerPage } from "../features/hiit-timer/HiitTimerPage";
import { HomePage } from "../features/home/HomePage";
import { TrainingPage } from "../features/training/TrainingPage";
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
    [routes.training]: <TrainingPage />,


  };

  return (
    <div className="app">
      <Header currentRoute={currentRoute} onNavigate={navigate} />

      <main className="main">{pages[currentRoute]}</main>
    </div>
  );
}

export default App;
