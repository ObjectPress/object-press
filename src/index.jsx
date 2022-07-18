import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import Amplify from 'aws-amplify';
import { awsConfig } from './aws-exports';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './store';
import AuthProvider from './context/AuthContext';
import App from './App';

Amplify.configure(awsConfig);

const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore({
  reducer: rootReducer,
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </ApolloProvider>
);
