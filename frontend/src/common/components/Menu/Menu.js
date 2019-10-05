import React, { useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BottomNavigationAction } from '@material-ui/core';

import { Navigation } from './styled';

function Menu({ routes, location }) {
  const activeRoute = useMemo(() => routes.find(route => route.path === location.pathname), [
    location
  ]);

  return (
    <Navigation value={activeRoute.key}>
      {routes.map(route => (
        <BottomNavigationAction
          key={route.key}
          component={NavLink}
          to={route.path}
          label={route.name}
          value={route.key}
          icon={<route.icon />}
        />
      ))}
    </Navigation>
  );
}

Menu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object
};

export default withRouter(Menu);
