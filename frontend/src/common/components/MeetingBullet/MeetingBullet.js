import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { StyledMeetingBullet } from './styled';

const getSize = points => {
  if (points <= 5) return 'small';
  if (points <= 10) return 'medium';

  return 'big';
};

const MeetingBullet = ({ faulty, radius, ongoing, theme, onClick, className, points = 1 }) => {
  const color = faulty ? theme.palette.error.main : theme.palette.primary.main;
  const size = useMemo(() => getSize(points), [points]);
  let classes = ['marker', className, ongoing ? 'pulse' : '', faulty ? 'error' : ''].join(' ');

  return (
    <StyledMeetingBullet
      height={radius * 2}
      width={radius * 2}
      className={classes}
      shapeRendering="optimizeSpeed"
      size={size}
      onClick={onClick}
    >
      <circle cx={radius} cy={radius} r={radius} stroke="none" fill={color} />
      {points > 1 && (
        <text x={radius} y={radius} textAnchor="middle" alignmentBaseline="central">
          {points}
        </text>
      )}
    </StyledMeetingBullet>
  );
};

MeetingBullet.defaultProps = {
  className: ''
};

MeetingBullet.propTypes = {
  className: PropTypes.string,
  points: PropTypes.number,
  faulty: PropTypes.bool,
  radius: PropTypes.number,
  ongoing: PropTypes.bool,
  theme: PropTypes.object,
  onClick: PropTypes.func
};

export default withTheme(MeetingBullet);
