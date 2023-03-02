import React, { useState } from 'react'
import FeedWrapper from './Components/FeedWrapper'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import AuthContext from './Components/context'
import './App.css'
import UserDashboard from './Components/UserDashboard/UserDashboard'
import Page from './Components/404'

const App = () => {
  const [authState, setAuthState] = useState({
    auth: false,
    token: '',
    userId: '',
  })

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path={`/feed/${authState.userId}`} element={<FeedWrapper />} />
        <Route
          path={`/profile/${authState.userId}`}
          element={<UserDashboard />}
        />
        <Route path='*' element={<Page />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
