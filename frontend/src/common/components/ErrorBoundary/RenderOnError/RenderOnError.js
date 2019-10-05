import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

import { ErrorWrapper } from './styled';

const RenderOnError = ({ reset, error, errorInfo, ErrorReporter, className }) => {
  if (ErrorReporter) {
    return <ErrorReporter error={error} errorInfo={errorInfo} reset={reset} />;
  }

  return (
    <ErrorWrapper className={className}>
      <ErrorIcon className="icon" />
      <Typography className="text">An error occurred</Typography>
      <Button onClick={reset} className="button">
        Try again
      </Button>
    </ErrorWrapper>
  );
};

RenderOnError.propTypes = {
  ErrorReporter: PropTypes.elementType,
  reset: PropTypes.func,
  error: PropTypes.object,
  errorInfo: PropTypes.object,
  className: PropTypes.string
};

export default withTheme(RenderOnError);
