export const routes = {
  home: "/hiit-training-planner/",
  hiit: "/hiit-training-planner/hiit",
  hiitCreate: "/hiit/create",
  hiitTimer: "/hiit/timer",
  rounds: "/hiit-training-planner/rounds",
  sets: "/hiit-training-planner/sets",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export function getCurrentRoute(): AppRoute {
  const path = window.location.pathname;

  switch (path) {
    case routes.hiit:
      return routes.hiit;

    case routes.rounds:
      return routes.rounds;

    case routes.sets:
      return routes.sets;

    default:
      return routes.home;
  }
}

export function navigateTo(route: AppRoute): void {
  window.history.pushState({}, "", route);

  window.dispatchEvent(new PopStateEvent("popstate"));
}
