import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
const AuthLayout = lazy(() => import('@/layouts/Auth'));
const AdminLayout = lazy(() => import('@/layouts/Admin'));
const ScrollToTop = lazy(() => import('@/components/ScrollToTop'));

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        {isAuthenticated && <Route path={`/`} component={AdminLayout} />}
        {!isAuthenticated && <Route path={`/`} component={AuthLayout} />}

        <ScrollToTop />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
