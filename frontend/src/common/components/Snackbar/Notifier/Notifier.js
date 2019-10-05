import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { API_URL } from 'config/api.config';

function Notifier({ dispatch }) {
  useEffect(() => {
    let conn;
    try {
      const user = 'bytex'; // get the correct user here
      conn = new WebSocket(`ws://${API_URL.split('http://')[1]}/ws?user=${user}`);
      conn.onmessage = evt => {
        const data = evt.data;
        try {
          const action = JSON.parse(data);
          console.log(action);
          dispatch(action);
        } catch (error) {
          console.log(error);
        }
      };
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (conn !== undefined) {
        conn.close();
      }
    };
  }, []);

  return null;
}

Notifier.propTypes = {
  notifications: PropTypes.array
};

export default connect(state => ({
  notifications: state.notifications.list
}))(Notifier);
