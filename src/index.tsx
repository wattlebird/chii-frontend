import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider as FluentProvider, teamsTheme } from '@fluentui/react-northstar'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FluentProvider theme={teamsTheme}>
        <Router>
          <App/>
        </Router>
      </FluentProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

