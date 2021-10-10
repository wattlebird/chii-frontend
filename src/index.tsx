import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider as FluentProvider, teamsTheme, teamsDarkTheme } from '@fluentui/react-northstar'
import { BrowserRouter as Router } from 'react-router-dom'
import { TypedTypePolicies, useSearchSubjectByTagQuery } from './graphql/index.generated'
import { ThemeContext } from './context'
import './index.css';
import App from './App';

const typePolicies: TypedTypePolicies = {
  BriefTag: {
    keyFields: ['tag', 'coverage']
  }
}

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache({typePolicies})
});

const ThemedApp = () => {
  const [theme, setTheme] = useState(teamsTheme);
  const [mode, setMode] = useState("bright");
  const toggleTheme = () => {
    if (theme === teamsTheme) {
      setTheme(teamsDarkTheme);
      setMode("dark");
    }
    else {
      setTheme(teamsTheme);
      setMode("bright");
    }
  }

  return <ThemeContext.Provider value={{
    theme,
    mode,
    updateTheme: toggleTheme
  }}>
    <FluentProvider theme={theme}>
      <App/>
    </FluentProvider>
  </ThemeContext.Provider>
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <ThemedApp />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

