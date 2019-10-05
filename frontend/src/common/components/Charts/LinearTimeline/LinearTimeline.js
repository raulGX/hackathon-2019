import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { LineChart, Line, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

import ActiveDot from './ActiveDot';
import GradientInterval from './GradientInterval';
import gradientIdProptype from './custom-proptypes';
import EmptyTooltip from '../EmptyTooltip';

function LinearTimeline({
  data,
  statusId,
  dotProps,
  syncId,
  color,
  hasReferenceLine,
  theme,
  gradientId,
  isAnimationActive,
  onIndexChange
}) {
  const colorGroup = {
    main: theme.palette.popup.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main
  };
  const activeDotProps = {
    colorGroup,
    hasReferenceLine,
    dotProps,
    statusId
  };
  const linearData = data.map((values, i) => ({
    ...values,
    linearX: i === data.length - 1 ? 4.55 : 4.5
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={linearData}
        syncId={syncId}
        margin={{ top: 0, bottom: 0, left: 5, right: 5 }}
      >
        <Tooltip cursor={false} content={EmptyTooltip} data={data} onChange={onIndexChange} />

        {hasReferenceLine && statusId && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {data.map((dataProps, index) => (
                <GradientInterval
                  key={dataProps.id}
                  {...dataProps[statusId]}
                  index={index}
                  dataLength={data.length}
                />
              ))}
            </linearGradient>
          </defs>
        )}

        {hasReferenceLine && (
          <ReferenceLine y={4.5} stroke={colorGroup.main} strokeWidth={2} strokeDasharray="4 6" />
        )}

        <Line
          isAnimationActive={isAnimationActive}
          strokeWidth={2}
          type="linear"
          dataKey="linearX"
          stroke={hasReferenceLine ? `url(#${gradientId})` : color}
          dot={false}
          activeDot={<ActiveDot {...activeDotProps} />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

LinearTimeline.defaultProps = {
  data: [{}, {}],
  dotProps: {},
  syncId: '',
  color: '',
  hasReferenceLine: false,
  gradientId: '',
  isAnimationActive: true
};

LinearTimeline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  hasReferenceLine: PropTypes.bool,
  dotProps: PropTypes.shape({
    stroke: PropTypes.string,
    fill: PropTypes.string
  }),
  syncId: PropTypes.string,
  color: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  gradientId: gradientIdProptype,
  isAnimationActive: PropTypes.bool,
  statusId: PropTypes.string,
  onIndexChange: PropTypes.func
};

export default withTheme(LinearTimeline);
