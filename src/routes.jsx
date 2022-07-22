import React, { lazy } from 'react';
// provided
const Dashboard = lazy(() => import('@/views/Dashboard/Dashboard'));
const Tables = lazy(() => import('@/views/Dashboard/Tables'));
const Billing = lazy(() => import('@/views/Dashboard/Billing'));
const Profile = lazy(() => import('@/views/Dashboard/Profile'));

// custom
const Home = lazy(() => import('@/views/Home'));
const SignIn = lazy(() => import('@/views/Auth/SignIn'));
const SignUp = lazy(() => import('@/views/Auth/SignUp'));
const Blogs = lazy(() => import('@/views/Dashboard/Blogs'));
const Blog = lazy(() => import('@/views/Dashboard/Blog'));
const Posts = lazy(() => import('@/views/Dashboard/Posts'));

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from '@/components/Icons/Icons';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/blogs',
    name: 'Blogs',
    icon: <DocumentIcon color="inherit" />,
    component: Blogs,
    layout: '/admin',
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    icon: <DocumentIcon color="inherit" />,
    component: Blog,
    layout: '/inner',
  },
  {
    path: '/posts',
    name: 'Posts',
    icon: <DocumentIcon color="inherit" />,
    component: Posts,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Tables',
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/billing',
    name: 'Billing',
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: '/admin',
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Sign In',
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Sign Up',
    icon: <RocketIcon color="inherit" />,
    component: SignUp,
    layout: '/auth',
  },
  {
    path: '/',
    name: 'Home',
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: '/auth',
  },
];

export default routes;
