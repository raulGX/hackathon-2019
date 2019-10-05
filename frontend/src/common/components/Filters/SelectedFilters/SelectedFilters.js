import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Chip } from '@material-ui/core';
import KeyboardArrowUp from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

import StyledIconButton from 'common/components/styled/StyledIconButton';
import { StyledTypography } from 'common/styles/shared';
import { filterPropTypes } from '../helpers/propTypes';
import { SelectedFiltersWrapper, ClearFiltersButton, FiltersList } from './styled';

export default function SelectedFilters({
  selectedFilters,
  onFilterDelete,
  onClearFilters,
  onCloseFilters,
  displayDivider
}) {
  const { t } = useTranslation();
  return (
    <SelectedFiltersWrapper className={displayDivider ? 'divider' : ''}>
      <FiltersList>
        {selectedFilters.length === 0 && (
          <StyledTypography className="no-filters-label">
            {t('common.noFiltersApplied')}
          </StyledTypography>
        )}

        {selectedFilters.map(selectedFilter => (
          <Chip
            key={selectedFilter.id}
            label={t(selectedFilter.label)}
            onDelete={() => onFilterDelete(selectedFilter)}
            className="selected-filter"
            deleteIcon={<CloseIcon />}
          />
        ))}
        {selectedFilters.length !== 0 && (
          <ClearFiltersButton color="primary" iconcolor="grey" onClick={onClearFilters}>
            {t('common.clearFilters')}
          </ClearFiltersButton>
        )}
      </FiltersList>

      <StyledIconButton iconcolor="grey" className="close-icon" onClick={onCloseFilters}>
        <KeyboardArrowUp className="arrow-collapse" />
      </StyledIconButton>
    </SelectedFiltersWrapper>
  );
}

SelectedFilters.propTypes = {
  selectedFilters: PropTypes.arrayOf(filterPropTypes),
  onFilterDelete: PropTypes.func,
  onClearFilters: PropTypes.func,
  onCloseFilters: PropTypes.func,
  displayDivider: PropTypes.bool
};
