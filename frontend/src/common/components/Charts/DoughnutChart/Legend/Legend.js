import React from 'react';
import PropTypes from 'prop-types';

import { Column, StyledTypography } from 'common/styles/shared';
import { divideByNonZero } from 'common/utils';
import { LegendWrapper, Circle } from './styled';

export default function Legend({ data, className, sum }) {
  return (
    <LegendWrapper className={className}>
      {data.map(d => (
        <Column key={d.label}>
          <Circle color={d.color} />
          <StyledTypography>{divideByNonZero(d.value, sum, 2) * 100}%</StyledTypography>
          <StyledTypography variant="caption" grey="true" noWrap>
            {d.label}
          </StyledTypography>
        </Column>
      ))}
    </LegendWrapper>
  );
}

Legend.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  sum: PropTypes.number
};
