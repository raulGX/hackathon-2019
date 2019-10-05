import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Column } from 'common/styles/shared';

import { StyledEvent } from './styled';

function Event({ event, showJoinBtn, ...props }) {
  return (
    <StyledEvent {...props}>
      <Column>
        <Typography variant="caption" color="primary" className="date">
          {moment(event.date).format('LLLL')}
        </Typography>
        <Typography variant="h6" className="name">
          {event.name}
        </Typography>
        <Typography color="textSecondary" className="place">
          {event.location.name} ∙ {event.location.distance} ∙ {event.usersRegistered.length} going
        </Typography>
      </Column>
      <Column>
        {showJoinBtn ? (
          <Button variant="outlined" color="primary" size="small">
            JOIN
          </Button>
        ) : null}
      </Column>
    </StyledEvent>
  );
}

Event.propTypes = {
  event: PropTypes.object,
  showJoinBtn: PropTypes.bool
};

export default Event;
