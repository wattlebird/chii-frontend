import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChiiThemeProvider } from './store/theme'
//import { PromiseWorkerLink } from './worker'
import App from './App'

//const worker = new Worker(new URL('./worker/worker.tsx', import.meta.url))
//const link = new PromiseWorkerLink({ worker })

const client = new ApolloClient({
  uri: '/graphql',
  //link: link,
  cache: new InMemoryCache(),
})

const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  <ChiiThemeProvider>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </ChiiThemeProvider>
)
