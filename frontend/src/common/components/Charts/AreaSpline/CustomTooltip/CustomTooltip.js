import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { StyledTooltip } from './styled';

export default function CustomTooltip({ payload, data }) {
  if (!payload || !payload.length) return null;

  const payloadInfo = payload[0].payload;
  const tooltipContent = payloadInfo && payloadInfo.name;
  const tooltipIndex = data.findIndex(d => d.name === payloadInfo.name);
  const centeredTooltip = tooltipIndex > 0 && tooltipIndex < data.length - 3;

  return tooltipContent ? (
    <StyledTooltip centeredTooltip={centeredTooltip}>
      <Typography variant="caption">{tooltipContent}</Typography>
    </StyledTooltip>
  ) : (
    <span />
  );
}

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
