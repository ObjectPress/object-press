import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '@/context/AuthContext';
import { Redirect, Route, useLocation } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const title = location.pathname.split('/')[1].replace(/(\/)|[0-9]|[-]/g, ' ');

  return (
    <>
      <Helmet>
        <title>
          {`${title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          )} | Object Press`}
        </title>
      </Helmet>

      <Route
        {...rest}
        exact
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

export function PublicRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>{`Object Press`}</title>
      </Helmet>

      <Route
        {...rest}
        exact
        render={({ location }) =>
          !isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: { from: location.pathname },
              }}
            />
          )
        }
      />
    </>
  );
}
