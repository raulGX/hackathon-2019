import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

import XIcon from 'assets/icons/x.svg';
import MoreIcon from 'assets/icons/more.svg';
import HeartIcon from 'assets/icons/heart.svg';
import CalendarIcon from 'assets/icons/calendar-2.svg';
import LocationIcon from 'assets/icons/location.svg';
import PeopleIcon from 'assets/icons/people.svg';
import IasicoinIcon from 'assets/icons/iasicoin.svg';

import { USERNAME } from 'config/api.config';
import { fetchEvents, joinEvent } from 'model/actions/events';
import {
  EventWrapper,
  EventHeader,
  Icons,
  EventContent,
  EventName,
  Stats,
  Stat,
  Divider,
  AboutTitle,
  Description,
  Sticky,
  Button
} from './styled';

function EventDetails({ events, match }) {
  const currentEventId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const event = events.find(({ id }) => id === currentEventId);
  if (!event) return null;
  const joined = event.usersRegistered.includes(USERNAME);

  return (
    <>
      <EventWrapper>
        <EventHeader>
          <Icons>
            <Link to="/events">
              <XIcon />
            </Link>
            <HeartIcon className="heart" />
            <MoreIcon />?
          </Icons>
        </EventHeader>
        <EventContent>
          <EventName>{event.name}</EventName>
          <Stats>
            <Stat className="date">
              <CalendarIcon />
              <span>{moment(event.date).format('LLLL')}</span>
            </Stat>
            <Stat>
              <LocationIcon />
              <span>{event.location.distance}</span>
            </Stat>
            <Stat>
              <PeopleIcon />
              <span>{event.usersRegistered.length} going</span>
            </Stat>
            <Stat>
              <IasicoinIcon />
              <span>{event.rewardCredits} Iasicoins</span>
            </Stat>
          </Stats>
          <Divider />
          <AboutTitle>About</AboutTitle>
          <Description>{event.description}</Description>
        </EventContent>
        <Sticky>
          <Button className={joined ? 'joined' : ''} onClick={() => dispatch(joinEvent(event.id))}>
            {event.finished
              ? 'FINISHED'
              : event.hasStarted
              ? 'IN PROGRESS'
              : joined
              ? 'JOINED'
              : 'JOIN'}
          </Button>
        </Sticky>
      </EventWrapper>
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
