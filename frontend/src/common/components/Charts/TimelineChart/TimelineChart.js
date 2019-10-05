import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

import EmptyTooltip from '../EmptyTooltip';

export default function TimelineChart({
  data,
  syncId,
  dotProps,
  color,
  isAnimationActive,
  onIndexChange,
  getDataKey
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} syncId={syncId}>
        <Tooltip cursor={false} content={EmptyTooltip} data={data} onChange={onIndexChange} />

        <Line
          isAnimationActive={isAnimationActive}
          strokeWidth={2}
          type="linear"
          dataKey={getDataKey}
          stroke={color}
          dot={false}
          activeDot={{ ...dotProps, strokeWidth: 2, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

TimelineChart.defaultProps = {
  data: [{}, {}],
  syncId: '',
  dotProps: {},
  color: '',
  isAnimationActive: true
};

TimelineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  syncId: PropTypes.string,
  color: PropTypes.string,
  dotProps: PropTypes.shape({
    stroke: PropTypes.string,
    fill: PropTypes.string
  }),
  isAnimationActive: PropTypes.bool,
  onIndexChange: PropTypes.func,
  getDataKey: PropTypes.func
};
