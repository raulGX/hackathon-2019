import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';

import routes from 'config/routes.config';
import AppRoutes from 'containers/AppRoutes';
import AuthWrapper from 'containers/AuthWrapper';
import GlobalStyles from 'common/styles/globalStyles';
import store from 'model/store';
import themeConfig from 'config/theme.config';
import WithTheme from 'containers/WithTheme';
import ErrorBoundary from 'components/ErrorBoundary';
import SocketNotifier from 'components/SocketNotifier';
import Snackbar from 'components/Snackbar';
import Notifier from 'components/Snackbar/Notifier';

const theme = createMuiTheme(themeConfig);

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles theme={theme} />
      <WithTheme theme={theme}>
        <ErrorBoundary>
          <Router>
            <SocketNotifier />
            <Snackbar>
              <Notifier />
              <AuthWrapper>
                <AppRoutes routes={routes} />
              </AuthWrapper>
            </Snackbar>
          </Router>
        </ErrorBoundary>
      </WithTheme>
    </Provider>
  );
}

export default hot(App);
