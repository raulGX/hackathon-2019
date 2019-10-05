import React from 'react';
import PropTypes from 'prop-types';

import NotificationIcon from '@material-ui/icons/NotificationsOutlined';
import { Badge } from '@material-ui/core';

import { StyledTrigger } from './styled';

export default function Trigger({ onTrigger, invisibleBadge, menuOpened }) {
  return (
    <StyledTrigger onClick={onTrigger} variant="contained" size="medium">
      <Badge className="badge" variant="dot" color="primary" invisible={invisibleBadge}>
        <NotificationIcon className={`icon ${menuOpened ? 'ui-active' : ''}`} />
      </Badge>
    </StyledTrigger>
  );
}

Trigger.defaultProps = {
  invisibleBadge: true,
  menuOpened: false
};

Trigger.propTypes = {
  onTrigger: PropTypes.func.isRequired,
  invisibleBadge: PropTypes.bool,
  menuOpened: PropTypes.bool
};
