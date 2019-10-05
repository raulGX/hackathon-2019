import React from 'react';
import PropTypes from 'prop-types';

export default function EmptyTooltip({ onChange, payload, data }) {
  if (!payload || !payload.length) return <span />;

  const payloadInfo = payload[0].payload;
  const tooltipIndex = data.findIndex(d => d.id === payloadInfo.id);

  onChange && onChange(tooltipIndex);
  return <span />;
}

EmptyTooltip.propTypes = {
  onChange: PropTypes.func,
  payload: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
