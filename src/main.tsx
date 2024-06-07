import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './router/router'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
