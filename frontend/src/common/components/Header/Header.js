import React from 'react';
import PropTypes from 'prop-types';

import ProfileIcon from 'assets/icons/profile.svg';
import NotificationsIcon from 'assets/icons/notifications.svg';

import { StyledHeader, PageTitle, Icons } from './styled';

function Header({ pageName }) {
  return (
    <>
      <StyledHeader>
        <PageTitle className="title">{pageName}</PageTitle>
        <Icons>
          <ProfileIcon />
          <NotificationsIcon />
        </Icons>
      </StyledHeader>
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default Header;
