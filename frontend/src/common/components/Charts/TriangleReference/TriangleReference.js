import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { ContainerWrapper } from './styled';
import EmptyTooltip from '../EmptyTooltip';

function CustomizedDot({ payload, userId, highlightedId, color }) {
  const { deviceType = {} } = payload[userId];
  const { setMarker, errorType, xScale } = deviceType;
  if (!setMarker) return null;
  const isHighlighted = highlightedId === payload.id;
  const strokeColor = isHighlighted ? color.highlighted : errorType ? color.error : color.default;

  return (
    <g style={{ transform: `translate(${xScale}%, 1.5rem)` }}>
      <path
        strokeWidth={2}
        stroke={strokeColor}
        fill={strokeColor}
        strokeLinejoin="round"
        strokeLinecap="square"
        d="m 5 7 l -5 -6 l 10 0 l -5 6"
      />
    </g>
  );
}

CustomizedDot.propTypes = {
  payload: PropTypes.object,
  userId: PropTypes.string,
  highlightedId: PropTypes.number,
  color: PropTypes.object.isRequired
};

function TriangleReference({
  data,
  dataKey,
  syncId,
  isAnimationActive,
  userId,
  highlightedId,
  theme,
  onIndexChange
}) {
  const color = {
    default: theme.palette.popup.main,
    error: theme.palette.error.main,
    highlighted: theme.palette.common.white
  };

  return (
    <ContainerWrapper>
      <ResponsiveContainer style={{ width: '100%', height: '100%' }}>
        <LineChart data={data} syncId={syncId} margin={{ top: 0, bottom: 0 }}>
          <Tooltip cursor={false} content={EmptyTooltip} data={data} onChange={onIndexChange} />

          <Line
            isAnimationActive={isAnimationActive}
            dot={<CustomizedDot color={color} userId={userId} highlightedId={highlightedId} />}
            dataKey={dataKey}
            stroke="none"
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ContainerWrapper>
  );
}

TriangleReference.defaultProps = {
  isAnimationActive: false
};

TriangleReference.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  syncId: PropTypes.string.isRequired,
  isAnimationActive: PropTypes.bool,
  userId: PropTypes.string,
  highlightedId: PropTypes.number,
  theme: PropTypes.object,
  onIndexChange: PropTypes.func
};

export default withTheme(TriangleReference);
