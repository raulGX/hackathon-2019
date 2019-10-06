import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { fetchMarketItems } from 'model/actions/market';

function Marketplace({ coins, marketItems }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketItems());
  }, [dispatch]);

  return (
    <>
      <Typography>Credits: {coins}</Typography>
      {marketItems.map(item => (
        <Card key={item.id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography color="textSecondary">{item.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Buy</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

Marketplace.propTypes = {
  coins: PropTypes.number,
  marketItems: PropTypes.array
};

export default connect(state => ({ coins: state.user.coins, marketItems: state.market.entities }))(
  Marketplace
);
