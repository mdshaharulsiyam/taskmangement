import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import YourTaskContext from './Context/YourTaskContext'
import('preline')
const queryClint = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
      <YourTaskContext>
        <Routes></Routes>
      </YourTaskContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
