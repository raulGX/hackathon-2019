import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

export default function ConfirmDialog({ title, isDialogOpen, message, onConfirm, handleClose }) {
  const { t } = useTranslation();

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          {t('common.Yes')}
        </Button>
        <Button onClick={handleClose} color="primary">
          {t('common.No')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.defaultProps = {
  onConfirm: () => {},
  handleClose: () => {}
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  isDialogOpen: PropTypes.bool,
  handleClose: PropTypes.func
};
