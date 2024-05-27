import { createBrowserRouter } from 'react-router-dom'
import MyLayout from '../layouts/layout'
import Dashboard from '../pages/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: ''
      }
    ]
  }
])
