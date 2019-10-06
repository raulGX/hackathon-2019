import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Swipeable } from 'react-swipeable';

import { fetchEvents } from 'model/actions/events';
import { USERNAME } from 'config/api.config';
import Event from 'components/Event';
import Map from './Map';
import Search from './Search';
import { EventsWrapper, EventsList, SwipeHandler, Indicator } from './styled';

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

  const onSwipeHandlerClick = () => {
    if (startingPoint === BOTTOM_POINT) onSwipeUp();
    else onSwipeDown();
  };

  return (
    <>
      <Search placeholder="Search..." searchTerm={searchTerm} onInputChange={setSearchTerm} />
      <Map />

      <EventsWrapper style={style} className={classes}>
        <Swipeable onSwiping={onSwiping} onSwipedUp={onSwipeUp} onSwipedDown={onSwipeDown}>
          <SwipeHandler onClick={onSwipeHandlerClick}>
            <Indicator />
          </SwipeHandler>
        </Swipeable>
        <EventsList>
          {events.map(event => (
            <Event
              key={event.id}
              event={event}
              className={`event ${event.usersRegistered.includes(USERNAME) ? 'joined' : ''}`}
              showJoinBtn
              joined={event.usersRegistered.includes(USERNAME)}
            />
          ))}
        </EventsList>
      </EventsWrapper>
    </>
  );
}

Events.propTypes = {
  events: PropTypes.array
};

export default connect(state => ({ events: state.events.entities }))(Events);
