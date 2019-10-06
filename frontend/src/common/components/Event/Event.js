import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { joinEvent } from 'model/actions/events';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Column } from 'common/styles/shared';
import { useDispatch } from 'react-redux';
import { StyledEvent } from './styled';

function Event({ event, showJoinBtn, joined, ...props }) {
  const dispatch = useDispatch();
  if (!event) return null;
  return (
    <Link to={`/events/${event.id}`}>
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
            <Button
              onClick={e => {
                e.preventDefault();
                dispatch(joinEvent(event.id));
              }}
              variant="outlined"
              color="primary"
              size="small"
            >
              {joined ? 'JOINED' : 'JOIN'}
            </Button>
          ) : null}
        </Column>
      </StyledEvent>
    </Link>
  );
}

Event.propTypes = {
  event: PropTypes.object,
  showJoinBtn: PropTypes.bool,
  joined: PropTypes.bool
};

export default Event;
