import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL, USERNAME } from 'config/api.config';
import api from 'model/api';

function SocketNotifier({ dispatch, username }) {
  useEffect(() => {
    let conn;

    if (username) {
      api
        .get(`${API_URL}/userInfo`, { user: username })
        .then(userInfo => dispatch({ type: '@@backend/USER_MODIFIED', payload: userInfo }));
    }

    try {
      const user = USERNAME;
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

SocketNotifier.propTypes = {
  dispatch: PropTypes.func
};

export default connect(state => ({ username: state.user.name }))(SocketNotifier);
