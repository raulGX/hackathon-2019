import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row } from 'common/styles/shared';
import { visual } from 'utils/mappings';
import { Container, Percentage, Name } from './styled';

function Widget({ category, percentage, ...props }) {
  const severity = useMemo(() => {
    if (percentage < 34) return 'critical';
    if (percentage < 67) return 'warning';

    return 'okay';
  }, percentage);

  return (
    <Container {...props} severity={severity}>
      <Row className="visual">
        {visual[category]}
        <Percentage>{percentage}%</Percentage>
      </Row>
      <Name>{category}</Name>
    </Container>
  );
}

Widget.propTypes = {
  category: PropTypes.string,
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Widget;
