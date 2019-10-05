import React from 'react';
import PropTypes from 'prop-types';

import 'react-perfect-scrollbar/dist/css/styles.css';

import StyledPerfectScrollbar from './styled';

export default function Scrollbar(props) {
  const { children } = props;

  return <StyledPerfectScrollbar {...props}>{children}</StyledPerfectScrollbar>;
}

Scrollbar.propTypes = {
  children: PropTypes.element.isRequired
};
