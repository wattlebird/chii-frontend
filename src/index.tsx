import React, { useCallback, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider as FluentProvider, teamsTheme, teamsDarkTheme } from '@fluentui/react-northstar';
import { BrowserRouter as Router } from 'react-router-dom';
import { TypedTypePolicies } from './graphql/index.generated';
import ThemeContext from './context';
import './index.css';
import App from './App';

const typePolicies: TypedTypePolicies = {
  BriefTag: {
    keyFields: ['tag', 'coverage'],
  },
};

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache({ typePolicies }),
});

function ThemedApp() {
  const [theme, setTheme] = useState(teamsTheme);
  const [mode, setMode] = useState('bright');
  const toggleTheme = useCallback(() => {
    if (theme === teamsTheme) {
      setTheme(teamsDarkTheme);
      setMode('dark');
    } else {
      setTheme(teamsTheme);
      setMode('bright');
    }
  }, [theme, setTheme, setMode]);
  const context = useMemo(() => ({
    theme,
    mode,
    updateTheme: toggleTheme,
  }), [toggleTheme, mode, theme]);

  return (
    <ThemeContext.Provider value={context}>
      <FluentProvider theme={theme}>
        <App />
      </FluentProvider>
    </ThemeContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <ThemedApp />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
