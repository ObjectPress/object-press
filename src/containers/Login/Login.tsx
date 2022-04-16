import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from 'graphql/mutations';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from 'context/auth';
import Topbar from './Topbar/Topbar';
import Footer from './Footer/Footer';
import './styles/index.css';

export default function Login() {
  const [login] = useMutation(LOGIN_MUTATION);
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  async function emailSession() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();

      const { data } = await login({
        variables: {
          user: {
            email: attributes.email,
            userId: attributes.sub,
          },
        },
      });

      if (data?.loginUser?.accessToken) {
        localStorage.setItem('op-access-token', data.loginUser.accessToken);
        history.go(0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function federatedSession(attributes: any) {
    try {
      const { data } = await login({
        variables: {
          user: {
            email: attributes.email,
            userId: attributes.id.replace('us-east-1:', ''),
          },
        },
      });

      if (data?.loginUser?.accessToken) {
        localStorage.setItem('op-access-token', data.loginUser.accessToken);

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return onAuthUIStateChange(async (nextAuthState, authData: any) => {
      if (authData?.id) {
        await federatedSession(authData);
      } else if (authData?.username) {
        await emailSession();
      }
    });
    // eslint-disable-next-line
  });

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/dashboard' }} />;
  }

  return (
    <>
      <Helmet>
        <title>Login | Object Press</title>
      </Helmet>

      <Topbar />
      <main style={{ background: '#f7faff' }}>
        <section className="relative w-full h-full py-40 min-h-screen">
          <AmplifyAuthenticator
            usernameAlias="email"
            federated={{
              googleClientId:
                '1035201445904-5p974ebq7aasf411ammemut36m7vf5bb.apps.googleusercontent.com',
            }}
          >
            <AmplifySignUp
              slot="sign-up"
              usernameAlias="email"
              formFields={[
                {
                  type: 'email',
                  label: 'Email Address *',
                  placeholder: 'Enter your email address',
                  inputProps: {
                    required: true,
                    autocomplete: 'email',
                  },
                },
                {
                  type: 'password',
                  label: 'Password *',
                  placeholder: 'Enter your password',
                  inputProps: {
                    required: true,
                    autocomplete: 'new-password',
                  },
                },
              ]}
            />
            <AmplifySignIn
              slot="sign-in"
              usernameAlias="email"
              federated-buttons={true}
              federated={{
                googleClientId:
                  '1035201445904-5p974ebq7aasf411ammemut36m7vf5bb.apps.googleusercontent.com',
              }}
            />
          </AmplifyAuthenticator>
        </section>
      </main>
      <Footer />
    </>
  );
}
