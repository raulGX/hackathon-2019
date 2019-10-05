import React, { useEffect, useState, useMemo } from 'react';
import { PropTypes } from 'prop-types';

import EditIcon from '@material-ui/icons/Edit';
import { Typography, ListItem, ListItemText } from '@material-ui/core';

import SearchBox from 'components/SearchBox';
import { highlightQuery, searchList } from 'common/utils';

import { StyledModal, StyledPaper, Trigger, StyledList, Head } from './styled';

export default function SelectModal({ options, value, onChange, modalTitle, searchPlaceholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm('');
  }, [isOpen]);
  const filteredOptions = useMemo(() => searchList(options, searchTerm, ['name']));

  function onClickItem(opt) {
    onChange(opt);
    setIsOpen(false);
  }

  function renderText(text) {
    return (
      <Typography className="text" variant="caption">
        {text}
      </Typography>
    );
  }

  function renderTrigger() {
    return (
      <Trigger onClick={() => setIsOpen(true)}>
        {renderText(value.name)}
        <EditIcon />
      </Trigger>
    );
  }

  if (!options.length) {
    return renderText(value.name);
  }

  return (
    <>
      {renderTrigger()}

      <StyledModal onBackdropClick={() => setIsOpen(false)} open={isOpen}>
        <StyledPaper>
          <Head>
            <Typography variant="h5">{modalTitle}</Typography>
            <SearchBox
              autoFocus
              placeholder={searchPlaceholder}
              searchTerm={searchTerm}
              onInputChange={setSearchTerm}
            />
          </Head>

          <StyledList>
            {filteredOptions.map(opt => (
              <ListItem
                button
                divider
                key={opt.id}
                className={`list-item ${opt.name === value.name ? 'selected' : ''}`}
                onClick={() => onClickItem(opt)}
              >
                <ListItemText primary={highlightQuery(opt.name, searchTerm)} />
              </ListItem>
            ))}
          </StyledList>
        </StyledPaper>
      </StyledModal>
    </>
  );
}

SelectModal.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  modalTitle: PropTypes.string,
  searchPlaceholder: PropTypes.string
};
