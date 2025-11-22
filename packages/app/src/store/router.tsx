import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import { About } from '../routes/About'
import { Ranking } from '../routes/Ranking'
import { SearchPage } from '../routes/Search';
import { Main } from '../routes/Main';
import Login from '../routes/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, element: <Main /> },
      { path: 'about', element: <About /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'rank', element: <Ranking /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to='/' replace={true} /> },
    ],
  },
])
