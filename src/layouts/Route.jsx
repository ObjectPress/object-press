import { Helmet } from 'react-helmet';
import { Route, useLocation } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }) {
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

      <Route {...rest} exact render={() => children} />
    </>
  );
}

export function PublicRoute({ children, ...rest }) {
  return <Route {...rest} exact render={() => children} />;
}
