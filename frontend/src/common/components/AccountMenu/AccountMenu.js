import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Typography, ListItem, ListItemText } from '@material-ui/core';

import Avatar from 'common/components/Avatar';
import Loader from 'components/Loader';
import { logoutUser, fetchUser } from 'model/actions/user';
import { IS_SUPER_ADMIN } from 'config/api.config';

import { AccountMenuWrapper, StyledPopover, StyledList, StyledDivider } from './styled';

function AccountMenu({ dispatch, user }) {
  const [isOpened, setOpen] = useState(false);
  const [triggerEl, setTrigger] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    !IS_SUPER_ADMIN && dispatch(fetchUser());
  }, [dispatch]);

  function openMenu(e) {
    setTrigger(e.currentTarget);
    setOpen(true);
  }

  function logout() {
    dispatch(logoutUser());
  }

  function renderMainOptions() {
    if (IS_SUPER_ADMIN) {
      return null;
    }

    return (
      <>
        <ListItem className="list-item">
          <Typography className="username" variant="subtitle1">
            {`${user.profile.firstname} ${user.profile.lastname}`}
          </Typography>
        </ListItem>

        <StyledDivider />
      </>
    );
  }

  return (
    <Loader isLoading={user.isLoading} small>
      <AccountMenuWrapper>
        <Avatar
          avatarUrl={
            user.profile.thumbnailimage
              ? `data:image/jpg;base64,${user.profile.thumbnailimage}`
              : null
          }
          onClick={openMenu}
          className={`${isOpened ? 'ui-active' : ''}`}
        />

        <StyledPopover
          open={isOpened}
          onClose={() => setOpen(false)}
          anchorEl={triggerEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <StyledList>
            {renderMainOptions()}

            <ListItem button onClick={logout}>
              <ListItemText primary={t('common.Logout')} />
            </ListItem>
          </StyledList>
        </StyledPopover>
      </AccountMenuWrapper>
    </Loader>
  );
}

AccountMenu.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
};

export default withRouter(
  connect(state => ({
    user: state.user
  }))(AccountMenu)
);
