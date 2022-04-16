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
          <PrivateRoute exact={true} path="/dashboard">
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/posts">
            <AdminLayout>
              <Posts />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/new-post">
            <AdminLayout>
              <Posts />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/update-post/:id">
            <AdminLayout>
              <Posts />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/gallery">
            <AdminLayout>
              <Gallery />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/new-gallery">
            <AdminLayout>
              <Gallery />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/update-gallery">
            <AdminLayout>
              <Gallery />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/upload">
            <AdminLayout>
              <Gallery />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/blogs">
            <AdminLayout>
              <Blogs />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/new-blog">
            <AdminLayout>
              <Blogs />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/update-blog/:id">
            <AdminLayout>
              <Blogs />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/settings">
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path="/credentials">
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </PrivateRoute>

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
