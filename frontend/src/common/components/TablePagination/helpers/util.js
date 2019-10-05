import moment from 'moment';

export function desc(a, b, orderBy) {
  let first = a[orderBy.id];
  let second = b[orderBy.id];
  if (orderBy.type === 'range') {
    first = moment(orderBy.getFirst(a)).unix();
    second = moment(orderBy.getFirst(b)).unix();
  }

  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export function getRowsPerPageOptions(itemsLength) {
  const options = [10, 25, 50];
  if (itemsLength <= 10) return options.splice(0, 1);
  if (itemsLength <= 25) return options.splice(0, 2);
  return options;
}
