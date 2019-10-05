import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import dom from 'common/utils/dom';

import { StyledInput } from './styled';

export default function SearchBox({ placeholder, onInputChange, searchTerm, autoFocus }) {
  const [focused, setFocused] = useState(false);
  const { t } = useTranslation();

  const clearInput = () => {
    onInputChange && onInputChange('');
  };

  const onInput = event => {
    const value = dom.parseNativeEventValue(event);
    onInputChange && onInputChange(value);
  };

  const getInputClasses = () => {
    const inputClasses = [focused ? 'focused' : '', searchTerm ? 'filled' : ''].join(' ');

    return inputClasses;
  };

  return (
    <StyledInput className={getInputClasses()}>
      <SearchIcon className="search-icon" />
      <TextField
        autoFocus={autoFocus}
        onChange={onInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={t(placeholder)}
        value={searchTerm}
        InputProps={{ disableUnderline: true }}
      />
      {searchTerm && <CloseIcon className="close-icon" onClick={clearInput} />}
    </StyledInput>
  );
}

SearchBox.defaultProps = {
  placeholder: 'common.searchMeeting'
};

SearchBox.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  searchTerm: PropTypes.string,
  onInputChange: PropTypes.func
};
