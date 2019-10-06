import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Event from 'components/Event';
import { fetchEvents } from 'model/actions/events';

function EventDetails({ events, match }) {
  const currentEventId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const event = events.find(({ id }) => id === currentEventId);

  return (
    <>
      <Event event={event} showJoinBtn={false} />
    </>
  );
}

EventDetails.propTypes = {
  events: PropTypes.array,
  match: PropTypes.object
};

export default withRouter(
  connect(state => ({ events: state.events.entities, username: state.user.name }))(EventDetails)
);
