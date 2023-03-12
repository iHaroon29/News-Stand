import React, { useState } from 'react'
import FeedWrapper from './Components/FeedWrapper'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import './App.css'
import UserDashboard from './Components/UserDashboard/UserDashboard'
import Page from './Components/404'
import { PrivateRoute } from './Components/utils/privateRoute'
import Test from './Components/Test'
import Dashboard from './Components/Dashboard/Dashboard'
import BlogPage from './Components/Pages/BlogPage'
import Publish from './Components/Pages/PublishPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route element={<PrivateRoute />}>
        <Route path={`/feed`} element={<Dashboard />} />
        <Route path={'/:userId/publish'} element={<Publish />} />
        <Route path={'/:userId/profile'} element={<UserDashboard />} />
        <Route path='/:userId/blog/:blogId' element={<BlogPage />} />
      </Route>
      <Route path='/blog/:blogId' element={<BlogPage />} />
      {/* <Route path='/test' element={<Test />} /> */}
      <Route path='*' element={<Page />} />
    </Routes>
  )
}

export default App
