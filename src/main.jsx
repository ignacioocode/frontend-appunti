import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import { router } from './router/index'
import UserProvider from './context/userProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
)
