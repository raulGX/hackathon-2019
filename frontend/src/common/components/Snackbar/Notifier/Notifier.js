import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@material-ui/core';

import { removeSnackbar } from 'model/actions/notifications';

function Notifier({ notifications, dispatch }) {
  const { t } = useTranslation();
  const [renderedNotifications, setRenderedNotifications] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DEFAULT_OPTIONS = {
    onClose: closeSnackbar,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    action: key => <Button onClick={() => closeSnackbar(key)}>Close</Button>
  };

  useEffect(() => {
    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (renderedNotifications.includes(notification.key)) return;
      // Display snackbar using notistack
      enqueueSnackbar(renderSnackbar(notification.message), {
        ...DEFAULT_OPTIONS,
        ...notification.options
      });
      // Keep track of snackbars that we've displayed
      setRenderedNotifications([...renderedNotifications, notification.key]);
      // Dispatch action to remove snackbar from redux store
      dispatch(removeSnackbar(notification.key));
    });
  }, [dispatch, notifications]);

  const renderSnackbar = message => <Typography variant="caption">{t(message)}</Typography>;

  return null;
}

Notifier.propTypes = {
  notifications: PropTypes.array
};

export default connect(state => ({
  notifications: state.notifications.list
}))(Notifier);
