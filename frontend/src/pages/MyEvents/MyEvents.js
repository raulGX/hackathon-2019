import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Event from 'components/Event';
import { fetchEvents } from 'model/actions/events';

function MyEvents({ events, username }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  events = events.filter(e => e.usersRegistered.includes(username));
  return (
    <>
      {events.map(event => (
        <Card key={event.id}>
          <CardContent>
            <Event event={event} showJoinBtn={false} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

MyEvents.propTypes = {
  events: PropTypes.array,
  username: PropTypes.string
};

export default connect(state => ({ events: state.events.entities, username: state.user.name }))(
  MyEvents
);
