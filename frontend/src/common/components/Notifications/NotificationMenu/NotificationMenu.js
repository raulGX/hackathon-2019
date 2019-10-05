import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

import ListItems from './ListItems';

import { StyledMenu, StyledPopover, NotificationList } from './styled';

export default function NotificationMenu({ triggerEl, isOpened, onClose, notificationItems }) {
  const { t } = useTranslation();

  return (
    <StyledPopover
      className="popover-wrapper"
      open={isOpened}
      onClose={onClose}
      anchorEl={triggerEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <StyledMenu>
        <NotificationList>
          <ListItems notificationItems={notificationItems} />
        </NotificationList>

        <Button size="medium" className="button-label">
          {t('common.seeAll')}
        </Button>
      </StyledMenu>
    </StyledPopover>
  );
}

NotificationMenu.defaultProps = {
  triggerEl: null,
  isOpened: false,
  notificationItems: []
};

NotificationMenu.propTypes = {
  triggerEl: PropTypes.instanceOf(Element),
  isOpened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  notificationItems: PropTypes.arrayOf(PropTypes.object)
};
