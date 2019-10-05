import React from 'react';
import { PropTypes } from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import StyledLoader from './styled';

export default function Loader({ isLoading, children, small }) {
  if (isLoading) {
    return (
      <StyledLoader>
        <CircularProgress size={small ? 20 : 40} />
      </StyledLoader>
    );
  }

  if (typeof children === 'function') {
    return children();
  }

  return children;
}

Loader.propTypes = {
  small: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
