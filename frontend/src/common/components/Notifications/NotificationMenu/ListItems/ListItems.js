import React from 'react';
import PropTypes from 'prop-types';

import Scrollbar from 'containers/Scrollbar';
import { Typography } from '@material-ui/core';

import { NotificationList, ListItem, Bullet, TextGroup } from './styled';

export default function ListItems({ notificationItems }) {
  return (
    <Scrollbar>
      <NotificationList>
        {notificationItems.map(item => (
          <ListItem key={item.id}>
            <Bullet color={item.isError ? 'error' : 'primary'} />

            <TextGroup>
              <Typography>{item.message}</Typography>
              <Typography variant="caption" className="date">
                {item.date}
              </Typography>
            </TextGroup>
          </ListItem>
        ))}
      </NotificationList>
    </Scrollbar>
  );
}

ListItems.defaultProps = {
  notificationItems: []
};

ListItems.propTypes = {
  notificationItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string,
      message: PropTypes.string,
      isError: PropTypes.bool
    })
  )
};
