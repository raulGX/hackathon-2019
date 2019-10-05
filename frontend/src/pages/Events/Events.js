import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { fetchEvents } from 'model/actions/events';

function Events({ events }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      {events.map(event => (
        <Card key={event.name}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {event.name}
            </Typography>
            <Typography color="textSecondary">{event.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Attend</Button>
            <Typography color="textSecondary">
              {event.location.distance}, {event.location.name}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

Events.propTypes = {
  events: PropTypes.array
};

export default connect(state => ({ events: state.events.entities }))(Events);
