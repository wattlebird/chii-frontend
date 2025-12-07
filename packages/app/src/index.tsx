import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { ChiiThemeProvider } from './store/theme'
import { AuthTokenProvider } from './store/auth'
import { router } from './store/router'
//import { PromiseWorkerLink } from './worker'

//const worker = new Worker(new URL('./worker/worker.tsx', import.meta.url))
//const link = new PromiseWorkerLink({ worker })

const client = new ApolloClient({
  uri: '/graphql',
  //uri: 'http://localhost:4000/graphql',
  //link: link,
  cache: new InMemoryCache(),
})

const container = document.getElementById('app')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  <ChiiThemeProvider>
    <AuthTokenProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthTokenProvider>
  </ChiiThemeProvider>
)
