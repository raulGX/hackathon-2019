import React, { useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BottomNavigationAction } from '@material-ui/core';

import { Navigation } from './styled';

function Menu({ routes, location }) {
  const activeRoute = useMemo(
    () => routes.find(route => route.path === location.pathname) || { key: '/' },
    [location]
  );

  return (
    <Navigation value={activeRoute.key}>
      {routes.map(route => (
        <BottomNavigationAction
          key={route.key}
          component={NavLink}
          to={route.path}
          value={route.key}
          icon={<route.icon />}
          showLabel={false}
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
