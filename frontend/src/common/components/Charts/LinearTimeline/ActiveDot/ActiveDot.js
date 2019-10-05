import React from 'react';
import PropTypes from 'prop-types';

export default function ActiveDot({
  payload,
  cx,
  cy,
  colorGroup,
  hasReferenceLine,
  dotProps,
  statusId
}) {
  if (!payload || !payload[statusId]) return null;

  const { statusType, errorType } = payload[statusId];
  const dotStrokeColors = {
    error: colorGroup.error,
    poor_connection: colorGroup.warning,
    not_connected: hasReferenceLine ? colorGroup.main : '',
    pending: hasReferenceLine ? colorGroup.main : ''
  };

  return (
    <circle
      {...dotProps}
      cx={cx}
      cy={cy}
      stroke={dotStrokeColors[errorType] || dotStrokeColors[statusType] || dotProps.stroke}
      strokeWidth={2}
      r={3}
    />
  );
}

ActiveDot.propTypes = {
  payload: PropTypes.object,
  cx: PropTypes.number,
  cy: PropTypes.number,
  colorGroup: PropTypes.object,
  hasReferenceLine: PropTypes.bool,
  dotProps: PropTypes.object,
  statusId: PropTypes.string
};
