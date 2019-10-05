import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ExpansionPanelSummary, TableSortLabel, Grid } from '@material-ui/core';

import ColumnHeader from 'components/styled/ColumnHeader';
import { columnsPropTypes } from '../helpers/propTypes';
import { StyledListHeader } from './styled';

export default function TableHeader({ onRequestSort, columns, orderBy, order }) {
  const { t } = useTranslation();

  return (
    <StyledListHeader expanded={false}>
      <ExpansionPanelSummary className="summary">
        <Grid container>
          {columns.map(column => (
            <Grid item xs={column.size} key={column.id} className="header-grid-item">
              {column.label && (
                <TableSortLabel
                  active={orderBy.id === column.id}
                  direction={order}
                  onClick={() => onRequestSort(column)}
                >
                  <ColumnHeader className="text">{t(column.label)}</ColumnHeader>
                </TableSortLabel>
              )}
            </Grid>
          ))}
        </Grid>
      </ExpansionPanelSummary>
    </StyledListHeader>
  );
}

TableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  columns: columnsPropTypes,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.object
};
