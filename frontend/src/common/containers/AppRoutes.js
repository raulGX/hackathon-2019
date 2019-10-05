import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} {...route.props} routes={route.routes} />}
  />
);

export default function AppRoutes({ routes }) {
  const defaultRoute = routes.find(r => r.default);
  return (
    <Switch>
      {routes.map(route => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      {defaultRoute && <Redirect from={defaultRoute.parent} exact to={defaultRoute.path} />}
    </Switch>
  );
}

AppRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};
