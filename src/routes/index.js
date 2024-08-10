import routes from './mapping';

const rootRoute = (router) => {
  Object.keys(routes).forEach((routeName) => {
    routes[routeName](router);
  });
};

export default rootRoute;
