import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { fetchMarketItems } from 'model/actions/market';

function Marketplace({ coins }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketItems());
  }, [dispatch]);

  return (
    <>
      <Typography>{coins}</Typography>
    </>
  );
}

Marketplace.propTypes = {
  coins: PropTypes.number
};

export default connect(state => ({ coins: state.user.coins }))(Marketplace);
