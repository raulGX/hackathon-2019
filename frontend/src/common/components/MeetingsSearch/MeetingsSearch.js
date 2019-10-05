import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { TextField, MenuItem } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import dom from 'common/utils/dom';
import { highlightQuery, searchList } from 'common/utils';
import Suggestion from 'common/components/Suggestion';
import MeetingBullet from 'common/components/MeetingBullet';

import { StyledPaper, Container, StyledInput } from './styled';

export default function MeetingsSearch({
  meetings,
  onMeetingSelected,
  selectedMeeting,
  placeholder
}) {
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(selectedMeeting);
  const [focused, setFocused] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedItem(selectedMeeting);
    if (!selectedMeeting) {
      setInputValue('');
      return;
    }

    setInputValue(`${selectedMeeting.id} - ${selectedMeeting.title}`);
  }, [selectedMeeting]);

  const handleChange = item => {
    if (item.id !== selectedItem) {
      setSelectedItem(item);

      if (onMeetingSelected) {
        onMeetingSelected(item);
      }
    }
    setInputValue(`${item.id} - ${item.title}`);
  };

  const renderSuggestions = ({
    inputValue: val,
    downshiftSelectedItem,
    highlightedIndex,
    getItemProps
  }) => {
    const suggestions = !val ? [] : searchList(meetings, val, ['id', 'title']);

    if (!suggestions.length && val) {
      return <MenuItem className="no-suggestions">{t('common.nothingFound')}</MenuItem>;
    }

    return suggestions.map((suggestion, index) => {
      const props = {
        suggestion,
        index,
        itemProps: getItemProps({ item: suggestion }),
        highlightedIndex,
        downshiftSelectedItem
      };
      return (
        <Suggestion key={suggestion.id} {...props}>
          {suggestion.ongoing && (
            <MeetingBullet
              radius={5}
              ongoing
              faulty={suggestion.faulty}
              className="meeting-bullet"
            />
          )}
          <span>
            {highlightQuery(suggestion.id, val)} {highlightQuery(suggestion.title, val)}
          </span>
        </Suggestion>
      );
    });
  };

  const renderDownshiftContent = downshiftProps => {
    const {
      getInputProps,
      getRootProps,
      getItemProps,
      isOpen,
      inputValue: downshiftInputValue,
      selectedItem: downshiftSelectedItem,
      highlightedIndex
    } = downshiftProps;
    return (
      <Container {...getRootProps({ refKey: 'ref' })}>
        <div className={`autocomplete-wrapper ${isOpen && inputValue ? 'opened' : ''}`}>
          {renderInput({
            InputProps: getInputProps({
              onChange: event => {
                setInputValue(dom.parseNativeEventValue(event));
              },
              onFocus: () => setFocused(true),
              onBlur: () => setFocused(false),
              placeholder: t(placeholder)
            })
          })}
          {isOpen && (
            <StyledPaper square>
              {renderSuggestions({
                inputValue: downshiftInputValue,
                selectedItem: downshiftSelectedItem,
                highlightedIndex,
                getItemProps
              })}
            </StyledPaper>
          )}
        </div>
      </Container>
    );
  };

  const clearInput = () => {
    setInputValue('');
    setSelectedItem(null);
    onMeetingSelected && onMeetingSelected(null);
  };

  const getInputClasses = () => {
    const inputClasses = [focused ? 'focused' : '', inputValue ? 'filled' : ''].join(' ');

    return inputClasses;
  };

  const renderInput = inputProps => {
    const { InputProps, ref, ...other } = inputProps;
    return (
      <StyledInput className={getInputClasses()}>
        <SearchIcon className="search-icon" />
        <TextField
          InputProps={{
            inputRef: ref,
            ...InputProps,
            disableUnderline: true
          }}
          {...other}
        />
        {inputValue && <CloseIcon className="close-icon" onClick={clearInput} />}
      </StyledInput>
    );
  };

  const itemToString = item => {
    if (!item) return '';

    return `${item.id} - ${item.title}`;
  };

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onSelect={handleChange}
      itemToString={itemToString}
      selectedItem={selectedItem}
    >
      {renderDownshiftContent}
    </Downshift>
  );
}

MeetingsSearch.defaultProps = {
  selectedItem: null,
  onMeetingSelected: null,
  placeholder: 'common.searchMeeting'
};

MeetingsSearch.propTypes = {
  selectedItem: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.shape({ element: PropTypes.func })
  }),
  meetings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.shape({ element: PropTypes.func })
    })
  ).isRequired,
  onMeetingSelected: PropTypes.func,
  placeholder: PropTypes.string,
  selectedMeeting: PropTypes.object
};
