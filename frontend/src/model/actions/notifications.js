import uuidv1 from 'uuid/v1';

export const showSnackbar = notification => dispatch => {
  dispatch({
    type: 'SHOW_SNACKBAR',
    notification: {
      key: uuidv1(),
      ...notification
    }
  });
};

export const removeSnackbar = key => dispatch => {
  dispatch({
    type: 'REMOVE_SNACKBAR',
    key
  });
};

export const showError = message => dispatch => {
  dispatch(
    showSnackbar({
      message,
      options: {
        variant: 'error',
        persist: true
      }
    })
  );
};
