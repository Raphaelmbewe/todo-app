const ROUTE_PREFIX = {
  dashboard: "/tasks",
  auth: "/auth",
};

const routeNames = {
  landing: "/",
  dashboard: {
    home: ROUTE_PREFIX.dashboard,
    completed: `${ROUTE_PREFIX.dashboard}/completed`,
    open: `${ROUTE_PREFIX.dashboard}/open`,
  },

  authentication: {
    signup: `${ROUTE_PREFIX.auth}/signup`
  },

};

export default routeNames;
