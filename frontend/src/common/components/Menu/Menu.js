import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import { StyledDrawer, Header, LogoWrapper, LogoText, StyledList, StyledListItem } from './styled';

function Menu({ routes }) {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Header>
        <LogoWrapper>
          <LogoText>
            <Typography variant="subtitle1">Wubadubdub</Typography>
          </LogoText>
        </LogoWrapper>
      </Header>

      <StyledList component="nav">
        {routes.map(route => (
          <NavLink to={route.path} key={route.key} className="nav-link">
            <StyledListItem className="list-item" button>
              {route.icon && <route.icon className="icon" />}
              <Typography variant="subtitle2" className="nav-text" title={route.name} noWrap>
                {route.name}
              </Typography>
            </StyledListItem>
          </NavLink>
        ))}
      </StyledList>
    </StyledDrawer>
  );
}

Menu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(state => ({
  org: state.org
}))(Menu);
