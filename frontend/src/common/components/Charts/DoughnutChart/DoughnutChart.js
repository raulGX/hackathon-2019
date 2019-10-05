import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { scaleLinear } from 'd3';
import { withTheme } from 'styled-components';

import { Wrapper, ChartWrapper, DoughnutWraper } from './styled';
import Legend from './Legend';

const INNER_RADIUS = 25;
const MAX_OUTER_RADIUS = 90;
const MIN_OUTER_RADIUS = 60;

function DoughnutChart({ data }) {
  const reversedData = useMemo(() => [...data].reverse(), [data]);
  const dataSum = useMemo(() => data.reduce((result, d) => result + d.value, 0), [data]);
  const droppingRate = useMemo(() => (MAX_OUTER_RADIUS - MIN_OUTER_RADIUS) / data.length, [data]);

  const scaleAngle = scaleLinear()
    .domain([0, dataSum])
    .range([0, 360]);

  const renderPies = () => {
    let endAngle;
    let prev = 0;

    return reversedData.map((d, index) => {
      endAngle = scaleAngle(dataSum - prev);
      prev += d.value;

      return (
        <Pie
          key={d.label}
          startAngle={0}
          endAngle={endAngle}
          data={[{ value: d.value }]}
          dataKey="value"
          cx="50%"
          cy="50%"
          fill={d.color}
          innerRadius={INNER_RADIUS}
          outerRadius={MAX_OUTER_RADIUS - (reversedData.length - index) * droppingRate}
          strokeWidth={0}
        />
      );
    });
  };

  return (
    <Wrapper>
      <ChartWrapper>
        <DoughnutWraper>
          <ResponsiveContainer>
            <PieChart className="pie-chart">
              {renderPies()}
              <Pie
                data={[{ value: 360 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={INNER_RADIUS + 1}
                innerRadius={INNER_RADIUS + 1}
                stroke="rgba(0, 0, 0, 0.14)"
                fill="rgba(0,0,0,0)"
                strokeWidth={3}
              />
            </PieChart>
          </ResponsiveContainer>
        </DoughnutWraper>
      </ChartWrapper>
      <Legend className="legend" data={data} sum={dataSum} />
    </Wrapper>
  );
}

DoughnutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.number
    })
  ).isRequired
};

export default withTheme(DoughnutChart);
