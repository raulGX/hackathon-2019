import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Widget({ title, children, ...props }) {
  return (
    <Card {...props}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}

Widget.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Widget;
