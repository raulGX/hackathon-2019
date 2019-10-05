import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

import { StyledInterval } from './styled';

export default function Interval({ interval, onClick, selected }) {
  const { t } = useTranslation();
  function onIntervalClick() {
    onClick(interval.id);
  }

  return (
    <StyledInterval
      button
      className={`interval ${selected ? 'selected' : ''}`}
      onClick={onIntervalClick}
    >
      <Typography variant="subtitle1" className="nav-text" title={t(interval.name)} noWrap>
        {t(interval.name)}
      </Typography>
    </StyledInterval>
  );
}

Interval.propTypes = {
  interval: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};
