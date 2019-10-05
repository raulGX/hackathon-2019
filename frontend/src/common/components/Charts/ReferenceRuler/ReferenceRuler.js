/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, XAxis, ResponsiveContainer } from 'recharts';

const tickFormatter = () => '';

export default function ReferenceRuler({ data, intervalTicksCount, intervals }) {
  const ticks = intervalTicksCount - 1;
  const intervalsCount = intervals - 1;

  // Draws the tick intervals
  const CustomizedTick = props => {
    let { index, x, y } = props;
    if (index % ticks !== 0) {
      return null;
    }
    return <line x={x} y={y} stroke="#666" fill="none" x1={x} y1={y + 3} x2={x} y2={y - 2} />;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ bottom: 0, top: 0, left: 5, right: 5 }}>
        <XAxis
          interval={0}
          type="number"
          tickCount={intervalsCount * ticks + 1}
          axisLine={false}
          tick={<CustomizedTick />}
          tickFormatter={tickFormatter}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

ReferenceRuler.defaultProps = {
  data: [{}, {}]
};

ReferenceRuler.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  intervalTicksCount: PropTypes.number.isRequired,
  intervals: PropTypes.number.isRequired
};
