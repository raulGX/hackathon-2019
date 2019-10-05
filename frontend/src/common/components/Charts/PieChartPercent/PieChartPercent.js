import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { scaleLinear } from 'd3';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { Typography } from '@material-ui/core';
import { ChartContainer } from './styled';

const scaleAngle = scaleLinear()
  .domain([0, 100])
  .range([0, 360]);

function PieChartPercent({ theme, data }) {
  const fillColor = theme.palette.primary.main;
  const strokeColor = theme.palette.text.primary38;
  const endAngle = scaleAngle(data);
  const radius = 70;

  return (
    <ChartContainer>
      <Typography className="label" variant="h4">{`${data}%`}</Typography>

      <ResponsiveContainer>
        <PieChart className="pie-chart">
          <Pie
            isAnimationActive={false}
            data={[{ value: data }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={radius}
            innerRadius={radius}
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth={1}
            strokeDasharray="3 4"
          />

          <Pie
            startAngle={0}
            endAngle={endAngle}
            data={[{ value: data }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={radius + 1}
            innerRadius={radius - 1}
            fill={fillColor}
            stroke={fillColor}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

PieChartPercent.propTypes = {
  data: PropTypes.number.isRequired,
  theme: PropTypes.object
};

export default withTheme(PieChartPercent);
