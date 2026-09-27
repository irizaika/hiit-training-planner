export const routes = {
  home: "/hiit-training-planner/",
  hiit: "/hiit-training-planner/hiit",
  training: "/hiit-training-planner/training",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export function getCurrentRoute(): AppRoute {
  const path = window.location.pathname;

  switch (path) {
    case routes.hiit:
      return routes.hiit;

    case routes.training:
      return routes.training;

    default:
      return routes.home;
  }
}

export function navigateTo(route: AppRoute): void {
  window.history.pushState({}, "", route);

  window.dispatchEvent(new PopStateEvent("popstate"));
}
