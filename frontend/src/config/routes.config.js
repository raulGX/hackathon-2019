import { lazy } from 'react';

import HomeIcon from 'assets/icons/home.svg';
import MyEventsIcon from 'assets/icons/my-events.svg';
import AllEventsIcon from 'assets/icons/all-events.svg';
import MarketplaceIcon from 'assets/icons/marketplace.svg';

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
        icon: MyEventsIcon
      },
      {
        key: 'events',
        exact: true,
        parent: '/',
        name: 'All Events',
        path: '/events',
        component: Events,
        icon: AllEventsIcon
      },
      {
        key: 'marketplace',
        exact: true,
        parent: '/',
        name: 'Marketplace',
        path: '/marketplace',
        component: Marketplace,
        icon: MarketplaceIcon
      }
    ]
  }
];

export default routes;
