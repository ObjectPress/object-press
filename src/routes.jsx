import React, { lazy } from 'react';
const Home = lazy(() => import('@/views/Home'));
const SignIn = lazy(() => import('@/views/Auth/SignIn'));
const SignUp = lazy(() => import('@/views/Auth/SignUp'));
const Dashboard = lazy(() => import('@/views/Dashboard/Dashboard'));
const Settings = lazy(() => import('@/views/Dashboard/Settings'));
const Blogs = lazy(() => import('@/views/Dashboard/Blogs'));
const Blog = lazy(() => import('@/views/Dashboard/Blog'));
const Posts = lazy(() => import('@/views/Dashboard/Posts'));

import {
  FaBook,
  FaChartBar,
  FaFileAlt,
  FaHome,
  FaUserAlt,
} from 'react-icons/fa';

export const adminRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <FaChartBar />,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/blogs',
    name: 'Blogs',
    icon: <FaBook />,
    component: Blogs,
    layout: '/admin',
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    icon: <FaBook />,
    component: Blog,
    layout: '/inner',
  },
  {
    path: '/posts',
    name: 'Posts',
    icon: <FaFileAlt />,
    component: Posts,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <FaUserAlt />,
    component: Settings,
    layout: '/admin',
  },
];

export const authRoutes = [
  {
    path: '/',
    name: 'Home',
    icon: <FaHome />,
    component: Home,
    layout: '/auth',
  },
  {
    path: '/login',
    name: 'Sign In',
    icon: <FaHome />,
    component: SignIn,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Sign Up',
    icon: <FaHome />,
    component: SignUp,
    layout: '/auth',
  },
];
