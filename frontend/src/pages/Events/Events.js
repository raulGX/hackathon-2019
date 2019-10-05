import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Swipeable } from 'react-swipeable';

import { fetchEvents } from 'model/actions/events';
import Map from './Map';
import Search from './Search';
import { EventsWrapper, SwipeHandler, Indicator } from './styled';

const BOTTOM_POINT = 120;
const TOP_POINT = 210;

function Events({ events }) {
  const [startingPoint, setStartingPoint] = useState(BOTTOM_POINT);
  const [isSwiping, setIsSwiping] = useState(false);
  const [style, setStyle] = useState({
    top: `calc(100vh - ${BOTTOM_POINT}px)`
  });
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const classes = isSwiping ? 'on-swiping' : '';

  const onSwiping = eventData => {
    if (!isSwiping) setIsSwiping(true);
    if (startingPoint === TOP_POINT) {
      if (TOP_POINT + -eventData.deltaY < window.innerHeight - BOTTOM_POINT) {
        setStyle({
          top: `${TOP_POINT + -eventData.deltaY}px`
        });
      }
      return;
    }

    if (startingPoint + eventData.deltaY > startingPoint) {
      setStyle({
        top: `calc(100vh - ${startingPoint + eventData.deltaY}px)`
      });
    }
  };

  const onSwipeUp = () => {
    if (startingPoint === TOP_POINT) return;

    setIsSwiping(false);
    setStyle({
      top: TOP_POINT
    });
    setStartingPoint(TOP_POINT);
  };

  const onSwipeDown = () => {
    if (startingPoint === BOTTOM_POINT) return;

    setIsSwiping(false);
    setStyle({
      top: 'calc(100vh - 120px)'
    });
    setStartingPoint(BOTTOM_POINT);
  };

  return (
    <>
      <Search placeholder="Search..." searchTerm={searchTerm} onInputChange={setSearchTerm} />
      <Map />

      <EventsWrapper style={style} className={classes}>
        <Swipeable onSwiping={onSwiping} onSwipedUp={onSwipeUp} onSwipedDown={onSwipeDown}>
          <SwipeHandler>
            <Indicator />
          </SwipeHandler>
        </Swipeable>
        {events.map(event => (
          <Card key={event.name} className="event">
            <CardContent>
              <Typography variant="h5" component="h2">
                {event.name}
              </Typography>
              <Typography color="textSecondary">{event.description}</Typography>
              <Typography color="textSecondary">
                {moment(event.date).format('DD MMM YYYY')}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Attend</Button>
              <Typography color="textSecondary">
                {event.location.distance}, {event.location.name}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </EventsWrapper>
    </>
  );
}

Events.propTypes = {
  events: PropTypes.array
};

export default connect(state => ({ events: state.events.entities }))(Events);
