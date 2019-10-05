import { lazy } from 'react';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';

const Index = lazy(() => import(/* webpackChunkName: "Index" */ 'pages/Index'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'pages/Dashboard'));
const Events = lazy(() => import(/* webpackChunkName: "Events" */ 'pages/Events'));
const Marketplace = lazy(() => import(/* webpackChunkName: "Marketplace" */ 'pages/Marketplace'));

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
        icon: HomeIcon
      },
      {
        key: 'my-events',
        exact: true,
        parent: '/',
        name: 'Events',
        path: '/my-events',
        component: Events,
        icon: AccessAlarmIcon
      },
      {
        key: 'events',
        exact: true,
        parent: '/',
        name: 'All Events',
        path: '/events',
        component: Events,
        icon: SearchIcon
      },
      {
        key: 'marketplace',
        exact: true,
        parent: '/',
        name: 'Marketplace',
        path: '/marketplace',
        component: Marketplace,
        icon: StoreIcon
      }
    ]
  }
];

export default routes;
