import api from 'model/api';
import { API_URL } from 'config/api.config';

export function fetchUser() {
  return dispatch => {
    const promise = api.get(`${API_URL}/contacts/v1/me`);

    dispatch({
      type: 'FETCH_USER',
      promise
    });
  };
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: 'LOGOUT'
  });
};

export const loginUser = () => dispatch => {
  dispatch({
    type: 'LOGIN'
  });
};
