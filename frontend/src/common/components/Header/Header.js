import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import { StyledHeader } from './styled';

function Header({ pageName }) {
  return (
    <>
      <StyledHeader>
        <Typography className="title" variant="h5">
          {pageName}
        </Typography>
      </StyledHeader>
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default Header;
