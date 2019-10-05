import React from 'react';
import PropTypes from 'prop-types';

import { parseNativeEventValue } from 'utils/dom';

import SearchIcon from 'assets/icons/all-events.svg';

import { Wrapper, Input } from './styled';

export default function SearchBox({ placeholder, onInputChange, searchTerm, autoFocus }) {
  const onInput = event => {
    const value = parseNativeEventValue(event);
    onInputChange && onInputChange(value);
  };

  return (
    <Wrapper>
      <Input
        autoFocus={autoFocus}
        onChange={onInput}
        placeholder={placeholder}
        value={searchTerm}
      />
      <SearchIcon className="search-icon" />
    </Wrapper>
  );
}

SearchBox.defaultProps = {
  placeholder: 'Search'
};

SearchBox.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  searchTerm: PropTypes.string,
  onInputChange: PropTypes.func
};
