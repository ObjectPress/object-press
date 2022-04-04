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
      <Switch>
        <PrivateRoute exact={true} path="/dashboard">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Dashboard />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/posts">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Posts />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/manage-post-images/:id">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Posts />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/new-post">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Posts />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/update-post/:id">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Posts />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/gallery">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Gallery />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/upload">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Gallery />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/blogs">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Blogs />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/new-blog">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Blogs />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/update-blog/:id">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Blogs />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/settings">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Settings />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Settings />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path="/credentials">
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Settings />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <Route path="/">
          <Suspense fallback={<InLineLoader />}>
            <Login /> <Redirect from="/" to="/" />
          </Suspense>
        </Route>
        <Suspense fallback={<InLineLoader />}>
          <Route component={NotFound} />
        </Suspense>
      </Switch>
    </AuthProvider>
  );
};

export default Routes;
