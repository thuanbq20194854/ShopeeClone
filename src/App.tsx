import { useState } from 'react'
import reactLogo from './assets/react.svg'
// eslint-disable-next-line import/no-unresolved
import viteLogo from '/vite.svg'
import './App.css'
import useRouteElement from './pages/useRouteElement'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div>
      {useRouteElement()}
      <ToastContainer />
    </div>
  )
}

export default App
