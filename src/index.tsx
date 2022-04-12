import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from 'store';
// providers
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ApolloProvider } from '@apollo/client';
import { client } from 'graphql/client';
// routes
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';
// styles
import 'theme/reset.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LightTheme } from 'theme';
// aws
import Amplify from 'aws-amplify';
import { awsconfig } from 'aws-exports';
import ScrollToTop from 'components/ScrollToTop';
Amplify.configure(awsconfig);

const engine = new Styletron();
const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes />
          </BrowserRouter>
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
