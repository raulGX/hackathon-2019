import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Typography, FormGroup, FormControlLabel, Checkbox, Collapse } from '@material-ui/core';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { Column } from 'common/styles/shared';

import SelectedFilters from './SelectedFilters';
import { useFilters } from './helpers/custom-hooks';
import { filterPropTypes } from './helpers/propTypes';

import { FiltersWrapper } from './styled';

export default function Filters({
  filters,
  selectedFilters,
  onSelectedFiltersChanged,
  onFiltersClosed,
  filtersActive,
  allFiltersCollapsed,
  onClearFilters
}) {
  const { selectedFilters: stateSelectedFilters, setSelectedFilters, handleChange } = useFilters(
    selectedFilters
  );
  const { t } = useTranslation();
  useEffect(() => {
    setSelectedFilters(selectedFilters);
  }, [selectedFilters, setSelectedFilters]);

  const onFilterDelete = filter => {
    const newSelectedFilters = selectedFilters.filter(
      selectedFilter => selectedFilter.id !== filter.id
    );
    setSelectedFilters(newSelectedFilters);
    onSelectedFiltersChanged(newSelectedFilters);
  };

  const renderFilters = () =>
    filters.map(category => (
      <Column key={category.id}>
        <Typography variant="caption" className="category">
          {t(category.label)}
        </Typography>
        {renderOptions(category.options)}
      </Column>
    ));

  const isOptionChecked = option => {
    const filter = stateSelectedFilters.find(f => f.id === option.id);

    return !!filter;
  };

  const renderOptions = options =>
    options.map(option => (
      <FormGroup row key={option.id}>
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon classes={{ root: 'blank-checkbox' }} />}
              checked={isOptionChecked(option)}
              onChange={() => handleChange(option, onSelectedFiltersChanged)}
              value={option.id}
              color="primary"
            />
          }
          label={t(option.label)}
        />
      </FormGroup>
    ));

  return (
    <>
      <Collapse in={!allFiltersCollapsed}>
        <SelectedFilters
          displayDivider={filtersActive}
          selectedFilters={selectedFilters}
          onFilterDelete={onFilterDelete}
          onCloseFilters={onFiltersClosed}
          onClearFilters={onClearFilters}
        />
      </Collapse>

      <Collapse in={filtersActive} unmountOnExit>
        <FiltersWrapper>{renderFilters()}</FiltersWrapper>
      </Collapse>
    </>
  );
}

Filters.defaultProps = {
  selectedFilters: []
};

Filters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      options: PropTypes.arrayOf(filterPropTypes)
    })
  ),
  selectedFilters: PropTypes.arrayOf(filterPropTypes),
  onSelectedFiltersChanged: PropTypes.func,
  onFiltersClosed: PropTypes.func,
  filtersActive: PropTypes.bool,
  allFiltersCollapsed: PropTypes.bool,
  onClearFilters: PropTypes.func
};
