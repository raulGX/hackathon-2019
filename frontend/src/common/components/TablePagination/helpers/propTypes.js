import PropTypes from 'prop-types';

export const columnsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }).isRequired
);

export const rowComponentsPropTypes = PropTypes.shape({
  Summary: PropTypes.func.isRequired,
  Details: PropTypes.func
});
