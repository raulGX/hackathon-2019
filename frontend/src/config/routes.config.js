import { lazy } from 'react';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const Index = lazy(() => import(/* webpackChunkName: "Index" */ 'pages/Index'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'pages/Dashboard'));

const routes = [
  {
    key: 'root',
    path: '/',
    component: Index,
    routes: [
      {
        key: 'dashboard',
        default: true,
        exact: true,
        parent: '/',
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
        icon: AccessAlarmIcon
      },
      {
        key: 'events',
        exact: true,
        parent: '/',
        name: 'Events',
        path: '/events',
        component: Dashboard,
        icon: AccessAlarmIcon
      }
    ]
  }
];

export default routes;
