import React from 'react';
import PropTypes from 'prop-types';

import { StyledSuggestion } from './styled';

export default function Suggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItems,
  children
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItems.findIndex(item => item.id === suggestion.id) > -1;

  return (
    <StyledSuggestion
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      classes={{ selected: 'selected' }}
      style={{
        fontWeight: isSelected ? 700 : 400
      }}
    >
      {children}
    </StyledSuggestion>
  );
}

Suggestion.defaultProps = {
  selectedItems: [],
  highlightedIndex: -1,
  index: -1
};

Suggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  itemProps: PropTypes.shape({}).isRequired,
  index: PropTypes.number,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ),
  suggestion: PropTypes.object,
  children: PropTypes.node
};
