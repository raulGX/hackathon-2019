/**
 * @description Stringifies an object for a HTTP Request
 * @param      {Object} obj - Object to be stringified
 * @returns    {String} Stringified object
 */

const stringify = obj => {
  if (!obj) {
    return '';
  }
  return Object.keys(obj)
    .sort()
    .map(key => {
      let val = obj[key];

      if (val === undefined || val === null) {
        return '';
      }

      if (Array.isArray(val)) {
        if (!val.length) {
          return '';
        }

        return val.reduce((prev, current, currentIndex) => {
          const separator = currentIndex === 0 ? '' : ',';
          return `${prev}${separator}${encodeURIComponent(current)}`;
        }, `${encodeURIComponent(key)}=`);
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    })
    .filter(part => !!part.length)
    .join('&');
};

export default {
  stringify
};
