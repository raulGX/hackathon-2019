import moment from 'moment';
import convert from 'htmr';

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`.
 *
 * @param {Array} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
export const groupBy = (collection, iteratee) => {
  let keyValue;

  return collection.reduce((result, x) => {
    keyValue = iteratee(x);
    (result[keyValue] = result[keyValue] || []).push(x);
    return result;
  }, {});
};

export const getPageNameFromPath = (pathname = '', routes) => {
  const [, pageKey] = pathname.split('/');
  const route = routes.find(r => r.key === pageKey);
  return route ? route.name : 'notFound';
};

export const formatDate = (date, format) => {
  if (!date) {
    return null;
  }
  const momentDate = date instanceof moment ? date : moment(date);
  return momentDate.format(format);
};

function getSearchRegex(value) {
  return new RegExp(value.replace(/\\/g, '\\\\'), 'gi');
}

export const searchList = (list = [], value = '', keys = []) => {
  if (!value || !keys.length) {
    return list;
  }
  const inputValue = value.toLowerCase();
  const regex = getSearchRegex(inputValue);

  return list.filter(item => keys.some(key => String(item[key]).search(regex) !== -1));
};

export function highlightQuery(str, query) {
  const regex = getSearchRegex(query);
  const highlighter = string => string.replace(regex, text => `<strong>${text}</strong>`);
  return convert(highlighter(String(str)));
}

export const divideByNonZero = (numerator, denominator, decimals = 2) => {
  if (denominator === 0) {
    return 0;
  }

  return (numerator / denominator).toFixed(decimals);
};

export const removeDuplicates = (array, property) => {
  const duplicates = {};

  return array.reduce((result, item) => {
    if (!duplicates[item[property]]) {
      duplicates[item[property]] = true;
      result.push(item);
    }

    return result;
  }, []);
};

export function debounce(func, wait, immediate) {
  let timeout;

  return function(...args) {
    func = func.bind(this);

    let later = function() {
      timeout = null;
      if (!immediate) func(...args);
    };
    let callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}
