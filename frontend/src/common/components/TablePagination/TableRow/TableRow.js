import React from 'react';
import PropTypes from 'prop-types';

import { ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

import { columnsPropTypes, rowComponentsPropTypes } from '../helpers/propTypes';
import { StyledListItem } from './styled';

export default function TableRow({
  columns,
  row,
  item,
  onItemClick,
  expanded,
  disableRowDetails,
  ...detailsProps
}) {
  const { Details, Summary } = row;
  const isExpanded = !disableRowDetails && expanded;
  const classes = [
    'list-item',
    isExpanded ? 'expanded' : '',
    disableRowDetails ? 'expansion-disabled' : ''
  ].join(' ');
  const areDetailsAvailable = Boolean(Details);

  return (
    <StyledListItem
      expanded={isExpanded}
      className={classes}
      onChange={() => onItemClick(item.id)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary className="list-summary">
        <Summary listItem={item} columns={columns} {...detailsProps} />
      </ExpansionPanelSummary>

      {areDetailsAvailable && (
        <ExpansionPanelDetails>
          <Details listItem={item} columns={columns} {...detailsProps} />
        </ExpansionPanelDetails>
      )}
    </StyledListItem>
  );
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  columns: columnsPropTypes,
  row: rowComponentsPropTypes,
  expanded: PropTypes.bool,
  disableRowDetails: PropTypes.bool
};
