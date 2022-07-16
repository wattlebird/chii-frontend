import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChiiThemeProvider } from './store/theme'
import { PromiseWorkerLink } from './worker'
import App from './App'

const worker = new Worker(new URL('./worker/worker.tsx', import.meta.url))
const link = new PromiseWorkerLink({ worker })

const client = new ApolloClient({
  //uri: '/api',
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ChiiThemeProvider>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </ChiiThemeProvider>,
  document.getElementById('app')
)
