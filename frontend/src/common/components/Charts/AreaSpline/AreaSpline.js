import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { AreaChart, Area, Tooltip, ResponsiveContainer, Dot } from 'recharts';

import { setDayRangeFromString } from 'model/actions/dateRange';
import { getAreMeetingsGroupedByHour } from 'model/selectors/analytics';
import { StyledValue, ContainerWrapper } from './styled';
import CustomTooltip from './CustomTooltip';

function AreaSpline({ color, data, dotStroke }) {
  const dispatch = useDispatch();
  const groupedByHour = useSelector(getAreMeetingsGroupedByHour);

  const DEFAULT_VALUE = data.length - 1;
  const [activeDotIndex, setActiveDotIndex] = useState(DEFAULT_VALUE);

  function updateActiveValue({ activeTooltipIndex }) {
    setActiveDotIndex(Number.isInteger(activeTooltipIndex) ? activeTooltipIndex : DEFAULT_VALUE);
  }

  function onDotClick(dot) {
    !groupedByHour && dispatch(setDayRangeFromString(dot.payload.name));
  }

  function renderDot(dotProps) {
    if (dotProps.index !== activeDotIndex) return null;
    const className = groupedByHour ? '' : 'clickableDot';
    return (
      <Dot
        {...dotProps}
        fillOpacity={1}
        stroke={dotStroke}
        r={6}
        onClick={onDotClick}
        className={className}
      />
    );
  }

  const activeValue = (data[activeDotIndex] && data[activeDotIndex].value) || 0;

  return (
    <>
      <StyledValue>{activeValue}</StyledValue>
      <ContainerWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            onMouseMove={updateActiveValue}
            onMouseLeave={() => updateActiveValue(DEFAULT_VALUE)}
          >
            <Tooltip
              cursor={{ stroke: 'none' }}
              offset={0}
              content={<CustomTooltip data={data} />}
            />

            <Area
              dot={renderDot}
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={0.3}
              fill={color}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ContainerWrapper>
    </>
  );
}

AreaSpline.defaultProps = {
  dotStroke: 'none'
};

AreaSpline.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dotStroke: PropTypes.string
};

export default AreaSpline;
