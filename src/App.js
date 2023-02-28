import React, { useState } from 'react'
import FeedWrapper from './Components/FeedWrapper'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import AuthContext from './Components/context'
import './App.css'
import UserDashboard from './Components/UserDashboard/UserDashboard'
const App = () => {
  const [authState, setAuthState] = useState({ auth: false, token: '' })

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/feed' element={<FeedWrapper />} />
        <Route path='/profile' element={<UserDashboard />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
