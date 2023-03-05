import React, { useState } from 'react'
import FeedWrapper from './Components/FeedWrapper'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import { AuthProvider } from './Components/context'
import './App.css'
import UserDashboard from './Components/UserDashboard/UserDashboard'
import Page from './Components/404'
// import Test from './Components/Test'
import { PrivateRoute } from './Components/utils/privateRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route element={<PrivateRoute />}>
        <Route path={`/feed`} element={<FeedWrapper />} />
        <Route path={'/profile/:userId'} element={<UserDashboard />} />
      </Route>
      <Route path='*' element={<Page />} />
    </Routes>
  )
}

export default App
