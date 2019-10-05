import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Event from 'components/Event';
import { fetchEvents } from 'model/actions/events';

function MyEvents({ events }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
  events: PropTypes.array
};

export default connect(state => ({ events: state.events.entities }))(MyEvents);
