import { lazy } from 'react';

// import DashboardIcon from 'assets/icons/Dashboard.svg';

const Index = lazy(() => import(/* webpackChunkName: "Index" */ 'pages/Index'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'pages/Dashboard'));

const routes = [
  {
    key: 'root',
    path: '/',
    component: Index,
    routes: [
      {
        key: 'Dashboard',
        default: true,
        exact: true,
        parent: '/',
        name: 'Dashboard',
        path: '/Dashboard',
        component: Dashboard
        // icon: DashboardIcon
      }
    ]
  }
];

export default routes;
