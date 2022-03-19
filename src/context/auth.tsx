import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import jwt_decode from 'jwt-decode';
import { AuthProps, JWToken } from 'types';
import { useMutation } from '@apollo/client';
import { VALIDATE_MUTATION } from 'graphql/mutations';

export const AuthContext = React.createContext({} as AuthProps);

const AuthProvider: React.FC = (props: any) => {
  const [token] = useState(localStorage?.getItem('op-access-token'));
  const [isAuthenticated, makeAuthenticated] = useState<boolean>(
    token ? true : false
  );
  const [validate] = useMutation(VALIDATE_MUTATION);

  async function isValidToken() {
    try {
      const accessToken = localStorage?.getItem('op-access-token') as string;
      const decoded = jwt_decode<JWToken>(accessToken);

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
  }

  useEffect(() => {
    async function authenticate() {
      const validToken = await isValidToken();

      if (!validToken) {
        signout();
      }
    }

    if (isAuthenticated) {
      authenticate();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  async function signout() {
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
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isValidToken,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
