import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/shared/Layout.jsx'
import { CustomKanban } from './components/CustomKanban.jsx'
import Statistics from './components/Statistics.jsx'
import Predict from './components/Predict.jsx'

 const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <CustomKanban />
        },
        {
          path: "statistics",
          element: <Statistics />
        },
        {
          path: "predict",
          element: <Predict />
        },
      ]
    },
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}

    <RouterProvider router={router} />
  </React.StrictMode>,
)
