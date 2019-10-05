import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';

export default function SuspenseLoading({ small, children }) {
  return <Suspense fallback={<Loader isLoading small={small} />}>{children}</Suspense>;
}

SuspenseLoading.propTypes = {
  small: PropTypes.bool,
  children: PropTypes.node
};
