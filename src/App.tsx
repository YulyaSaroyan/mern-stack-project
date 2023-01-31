import React, { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

const LogIn = lazy(() => import('./components/LogIn/LogIn'))
const Registration = lazy(() => import('./components/Registration/Registration'))
const Wrapper = lazy(() => import('./pages/Wrapper/Wrapper'))
const UserPage = lazy(() => import('./components/UserPage/UserPage'))

const App = () => {
  // const [status, setStatus] = useState<boolean>(false)
  return (
      <div className="app">
        <Routes>
        <Route path="/" element={<Suspense fallback={<>Loading</>}><Wrapper/></Suspense>}>
            <Route index element={<Suspense fallback={<>Loading...</>}><LogIn/></Suspense>}/>
            <Route path="registration" element={<Suspense fallback={<>Loading...</>}><Registration/></Suspense>}/>
            <Route path="user-account" element={<Suspense fallback={<>Loading...</>}><UserPage/></Suspense>}/>
          </Route>
        </Routes>
      </div>
  )
}

export default App
