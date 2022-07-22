import React, { createContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import jwt_decode from 'jwt-decode';
import { useMutation } from '@apollo/client';
import { VALIDATE_MUTATION } from '../graphql/mutations';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token] = useState(localStorage?.getItem('op-access-token'));
  const [isAuthenticated, makeAuthenticated] = useState(token ? true : false);
  const [validate] = useMutation(VALIDATE_MUTATION);

  const isValidToken = async () => {
    try {
      const accessToken = localStorage?.getItem('op-access-token');
      const decoded = jwt_decode(accessToken);

      if (decoded.exp > Math.floor(Date.now() / 1000)) {
        makeAuthenticated(true);
        return true;
      } else {
        const { data } = await validate();
        let res = data?.validateUser?.accessToken;

        if (res) {
          localStorage.setItem('op-access-token', res);

          makeAuthenticated(true);
          return true;
        }
      }
    } catch {
      makeAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const validToken = await isValidToken();

      if (!validToken) {
        signOut();
      }
    };

    if (isAuthenticated) {
      authenticate();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const signOut = async () => {
    let validToken = await isValidToken();

    while (validToken) {
      makeAuthenticated(false);

      try {
        localStorage.removeItem('op-access-token');
        await Auth.signOut();
      } catch (err) {
        console.log(err);
        await Auth.signOut();
      }
      validToken = await isValidToken();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isValidToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
