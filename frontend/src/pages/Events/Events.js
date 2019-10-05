import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import { fetchEvents } from 'model/actions/events';

function Events({ events }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return <>{events}</>;
}

Events.propTypes = {
  events: PropTypes.array
};

export default connect(state => ({ events: state.events.entities }))(Events);
