import React, { useContext, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import AuthProvider, { AuthContext } from 'context/auth';
import { InLineLoader } from 'components/InlineLoader/InlineLoader';
import AdminLayout from 'containers/Layout/Layout';
const Settings = lazy(() => import('containers/Settings/Settings'));
const Gallery = lazy(() => import('containers/Gallery/Gallery'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
const Posts = lazy(() => import('containers/Posts/Posts'));
const Blogs = lazy(() => import('containers/Blogs/Blogs'));
const Login = lazy(() => import('containers/Login/Login'));
const NotFound = lazy(() => import('containers/NotFound/NotFound'));

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation()
    .pathname.split('/')[1]
    .replace(/(\/)|[0-9]|[-]/g, ' ');

  return (
    <>
      <Helmet>
        <title>
          {`${location.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          )} | Object Press`}
        </title>
      </Helmet>

      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location.pathname },
              }}
            />
          )
        }
      />
    </>
  );
}

const Routes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <AdminLayout>
            <PrivateRoute exact={true} path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/posts">
              <Posts />
            </PrivateRoute>
            <PrivateRoute path="/new-post">
              <Posts />
            </PrivateRoute>
            <PrivateRoute path="/update-post/:id">
              <Posts />
            </PrivateRoute>
            <PrivateRoute path="/gallery">
              <Gallery />
            </PrivateRoute>
            <PrivateRoute path="/new-gallery">
              <Gallery />
            </PrivateRoute>
            <PrivateRoute path="/update-gallery">
              <Gallery />
            </PrivateRoute>
            <PrivateRoute path="/new-image">
              <Gallery />
            </PrivateRoute>
            <PrivateRoute path="/upload">
              <Gallery />
            </PrivateRoute>
            <PrivateRoute path="/blogs">
              <Blogs />
            </PrivateRoute>
            <PrivateRoute path="/new-blog">
              <Blogs />
            </PrivateRoute>
            <PrivateRoute path="/update-blog/:id">
              <Blogs />
            </PrivateRoute>
            <PrivateRoute path="/settings">
              <Settings />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Settings />
            </PrivateRoute>
            <PrivateRoute path="/credentials">
              <Settings />
            </PrivateRoute>
          </AdminLayout>

          <Route path="/">
            <Login /> <Redirect from="/" to="/" />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default Routes;
