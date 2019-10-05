import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RenderOnError from './RenderOnError';

class ErrorBoundary extends Component {
  constructor(args) {
    super(args);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    onError && onError(error, errorInfo);

    this.setState({ error, errorInfo });
  }

  reset = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    const { error, errorInfo } = this.state;
    const { ErrorReporter, children, className } = this.props;

    if (error) {
      return (
        <RenderOnError
          ErrorReporter={ErrorReporter}
          reset={this.reset}
          error={error}
          errorInfo={errorInfo}
          className={className}
        />
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  ErrorReporter: PropTypes.elementType,
  onError: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

export default ErrorBoundary;
