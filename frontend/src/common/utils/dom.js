/**
 * @description A wrapper for getting the value from a form input (input, select, textarea...)
 * @param      {Object} ev - Event from the change event listener
 * @returns    {String} Value of a form element
 */

const parseNativeEventValue = ev => {
  if (!ev || !ev.target) {
    return ev;
  }
  const { target } = ev;
  if (target.type === 'checkbox') {
    return target.checked;
  }

  let { value } = target;
  const { options } = ev.target;
  if (options) {
    value = [...options].filter(option => option.selected).map(option => option.value);

    if (!ev.target.multiple) {
      let [first] = value;
      value = first;
    }
  }

  return value;
};

export default {
  parseNativeEventValue
};
