import React, { lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
// import Cookie from 'js-cookie';

// import { COOKIE_NAME } from 'config/api.config';
import { loginUser, logoutUser } from 'model/actions/user';
import SuspenseLoading from './SuspenseLoading';

// const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'pages/Login'));

function AuthWrapper({ dispatch, loggedIn, children }) {
  // const cookie = Cookie.get(COOKIE_NAME);

  useEffect(() => {
    if (!loggedIn && !!cookie) {
      dispatch(loginUser());
    }
    if (loggedIn && !cookie) {
      dispatch(logoutUser());
    }
  }, [cookie]);

  const handleJWT = () => {
    dispatch(loginUser());
  };

  return (
    <SuspenseLoading>
      <Switch>
        {/* <Route path="/login" exact render={props => <Login {...props} />} /> */}
        <Switch>{children}</Switch>
      </Switch>
    </SuspenseLoading>
  );
}

AuthWrapper.propTypes = {
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool,
  children: PropTypes.node
};

export default withRouter(connect(state => ({ loggedIn: state.user.loggedIn }))(AuthWrapper));
