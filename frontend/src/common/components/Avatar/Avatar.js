import React from 'react';
import PropTypes from 'prop-types';

import PersonIcon from '@material-ui/icons/PersonOutline';

import { AvatarWrapper } from './styled';

export default function Avatar({ avatarUrl, onClick, className }) {
  const renderAvatar = () => {
    if (!avatarUrl) {
      return <PersonIcon className={className} />;
    }

    return <img alt="avatar" src={avatarUrl} />;
  };

  return <AvatarWrapper onClick={onClick}>{renderAvatar()}</AvatarWrapper>;
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};
