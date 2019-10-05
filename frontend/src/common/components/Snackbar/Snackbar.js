import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';

import { SnackBarWrapper } from './styled';

export default function Snackbar({ children }) {
  return (
    <SnackBarWrapper>
      <SnackbarProvider
        hideIconVariant
        preventDuplicate
        classes={{
          variantError: 'variantError'
        }}
      >
        {children}
      </SnackbarProvider>
    </SnackBarWrapper>
  );
}

Snackbar.propTypes = {
  children: PropTypes.node
};
