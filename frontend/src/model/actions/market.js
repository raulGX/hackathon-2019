import api from 'model/api';
import { API_URL } from 'config/api.config';

export function fetchMarketItems() {
  return dispatch => {
    const promise = api.get(`${API_URL}/marketplace`);

    dispatch({
      type: 'FETCH_MARKET_ITEMS',
      promise
    });
  };
}

export function buyItem() {
  return dispatch => {
    const promise = api.post(`${API_URL}/market`);

    dispatch({
      type: 'BUY_ITEM',
      promise
    });
  };
}
