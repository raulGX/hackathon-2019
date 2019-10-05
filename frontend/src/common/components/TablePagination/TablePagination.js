import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TablePagination } from '@material-ui/core';

import Loader from 'components/Loader';

import { ListItems } from './styled';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import { stableSort, getSorting, getRowsPerPageOptions } from './helpers/util';
import { columnsPropTypes, rowComponentsPropTypes } from './helpers/propTypes';

export default function Table({
  columns,
  rowComponents,
  initialOrderByColumn,
  listItems,
  isLoading,
  disableRowDetails,
  ...detailsProps
}) {
  const rowsOptions = getRowsPerPageOptions(listItems.length);

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(initialOrderByColumn);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsOptions[0]);
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleRequestSort = column => {
    const changeOrder = orderBy.id === column.id && order === 'desc';
    setOrder(changeOrder ? 'asc' : 'desc');
    setOrderBy(column);
  };

  const handlePageChange = (event, pageNumber) => {
    setPage(pageNumber);
    setExpandedRowId(null);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const toggleItem = id => {
    const rowId = id === expandedRowId ? null : id;
    setExpandedRowId(rowId);
  };

  const sortedItems = stableSort(listItems, getSorting(order, orderBy));
  const visibleItems = sortedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableHeader
        columns={columns}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />

      <ListItems rows={visibleItems.length || rowsPerPage}>
        <Loader isLoading={isLoading}>
          {visibleItems.map(item => (
            <TableRow
              {...detailsProps}
              key={item.id}
              row={rowComponents}
              columns={columns}
              item={item}
              expanded={expandedRowId === item.id}
              onItemClick={toggleItem}
              disableRowDetails={disableRowDetails}
            />
          ))}
        </Loader>
      </ListItems>

      <TablePagination
        rowsPerPageOptions={rowsOptions}
        component="div"
        count={listItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

Table.propTypes = {
  columns: columnsPropTypes,
  rowComponents: rowComponentsPropTypes,
  listItems: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  initialOrderByColumn: PropTypes.object,
  toggleItem: PropTypes.func,
  expandedRowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disableRowDetails: PropTypes.bool
};
