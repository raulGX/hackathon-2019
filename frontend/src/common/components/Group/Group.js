import React from 'react';
import PropTypes from 'prop-types';

import { StyledTypography } from 'common/styles/shared';
import { GroupWrapper } from './styled';

export default function Group({ label, value, ...rest }) {
  return (
    <GroupWrapper>
      <StyledTypography ellipsis="true" {...rest}>
        {value || '-'}
      </StyledTypography>
      <StyledTypography variant="caption" grey="true">
        {label}
      </StyledTypography>
    </GroupWrapper>
  );
}

Group.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
