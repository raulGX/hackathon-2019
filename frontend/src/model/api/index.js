// import Cookie from 'js-cookie';

import store from 'model/store';
import { logoutUser } from 'model/actions/user';
import { showError } from 'model/actions/notifications';
import { USERNAME } from 'config/api.config';

import query from './query';

const parseOptions = options => ({
  ...options,
  headers: {
    'Content-Type': 'application/json',
    'X-TOKEN': `${USERNAME}`,
    ...options.headers
  },
  method: options.method || 'GET',
  body: options.body ? JSON.stringify(options.body) : null
});

/**
 * Building a wrapper over Fetch API
 * e.g. of calls:
 *    - fetchWrap(url, { body, method: 'POST' })
 *    - fetchWrap(url, { body, method: 'GET', query: {sortBy: 'id', page: 2} })
 */
const fetchWrap = async (url, options = {}) => {
  let fetchUrl = url;
  if (options.query) {
    fetchUrl += `?${query.stringify(options.query)}`;
  }
  const fetchOptions = parseOptions(options);
  const fetchPromise = fetch(fetchUrl, fetchOptions);
  const response = await fetchPromise;

  if (response.status === 401) {
    store.dispatch(logoutUser());
    store.dispatch(showError('http.401'));
    return {};
  }

  if (!response.ok) {
    store.dispatch(showError('http.genericError'));
    throw new Error('http.genericError');
  }

  try {
    const data = await response.json();
    Object.defineProperty(data, 'headers', {
      value: response.headers,
      writable: false
    });

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  } catch (err) {
    console.warn(err);
    return {};
  }
};

/**
 * Default shorthands for usual REST requests
 * e.g. of calls:
 *    - get(url, {sortBy: 'id', page: 2})
 *    - post(url, { name: 'Post', example: true })
 *    - put(url, { update: true })
 *    - delete(url, { id: 123 })
 */
export default {
  get(url, q) {
    return fetchWrap(url, { query: q });
  },
  post(url, body) {
    return fetchWrap(url, { body, method: 'POST' });
  },
  put(url, body) {
    return fetchWrap(url, { body, method: 'PUT' });
  },
  delete(url, body) {
    return fetchWrap(url, { body, method: 'DELETE' });
  }
};
