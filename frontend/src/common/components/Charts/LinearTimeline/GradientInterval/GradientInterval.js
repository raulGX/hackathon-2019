import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from 'styled-components';
import { scaleLinear } from 'd3';

function GradientInterval({ statusType, errorType, index, theme, dataLength }) {
  if (index === dataLength) return null;

  const gradientScale = scaleLinear()
    .domain([0, dataLength - 1])
    .range([0, 100]);

  const mainColor = theme.palette.primary.main;
  const firstOffset = `${gradientScale(index)}%`;
  const nextOffset = `${gradientScale(index + 1)}%`;

  const statusColors = {
    not_connected: 'transparent',
    pending: 'transparent',
    error: theme.palette.error.main,
    poor_connection: theme.palette.warning.main
  };
  const stopColor = statusColors[errorType] || statusColors[statusType] || mainColor;

  return (
    <>
      <stop offset={firstOffset} stopColor={stopColor} />
      <stop offset={nextOffset} stopColor={stopColor} />
    </>
  );
}

GradientInterval.propTypes = {
  statusType: PropTypes.string,
  errorType: PropTypes.string,
  index: PropTypes.number.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  dataLength: PropTypes.number
};

export default withTheme(GradientInterval);
