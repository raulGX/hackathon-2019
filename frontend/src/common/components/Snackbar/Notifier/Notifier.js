import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL } from 'config/api.config';

function Notifier({ dispatch }) {
  useEffect(() => {
    let conn;
    try {
      const user = 'bytex'; // get the correct user here
      conn = new WebSocket(`ws://${API_URL.split('http://')[1]}/ws?user=${user}`);
      conn.onmessage = evt => {
        const { data } = evt;
        try {
          const action = JSON.parse(data);
          dispatch(action);
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error(error);
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
  dispatch: PropTypes.func
};

export default connect()(Notifier);
