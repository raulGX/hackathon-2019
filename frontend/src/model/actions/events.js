import api from 'model/api';
import { API_URL } from 'config/api.config';

export function fetchEvents() {
  return dispatch => {
    const promise = api.get(`${API_URL}/events`);

    dispatch({
      type: 'FETCH_EVENTS',
      promise
    });
  };
}

export function postEvent(event) {
  return dispatch => {
    const promise = api.post(`${API_URL}/events`, event);

    dispatch({
      type: 'POST_EVENT',
      promise
    });
  };
}
