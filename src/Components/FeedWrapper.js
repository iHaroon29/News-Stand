import React, { useEffect, useState, useRef, useContext } from 'react'
import Feed from './Feed'
import Publish from './Publish'
import Tags from './Tags'
import { useNavigate } from 'react-router-dom'
import AuthContext from './context'
const FeedWrapper = () => {
  const { auth } = useContext(AuthContext)
  const [updates, setUpdates] = useState([])
  const wsConnection = useRef(null)
  const navigate = useNavigate()
  const test = () => {
    navigate(`/profile/${auth.userId}`)
  }
  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/feed?token=${auth.token}`
    )
    socket.onopen = () => {
      console.log('socket is open')
    }
    socket.onmessage = (response) => {
      const { responseType, messageData } = JSON.parse(response.data)
      if (responseType === 'ack') {
        return console.log(messageData)
      }
      if (responseType === 'notification') {
        return setUpdates((prev) => [...prev, messageData])
      }
      if (responseType === 'disconnect') {
        console.log(messageData)
      }
    }
    socket.onerror = (e) => {
      console.log(e.message)
    }
    socket.onclose = () => {
      console.log('Connection Closed')
    }
    wsConnection.current = socket
    return () => {
      socket.close()
    }
  }, [])
  return (
    <div className='feed-wrapper'>
      <div className='feed-top'>
        <Tags />
      </div>
      <div className='feed-left'>
        <div className='feed-scroll'>
          <Feed test='test' updates={updates} />
        </div>
      </div>
      <div className='feed-right'>
        <Publish ref={wsConnection} />
      </div>
      <button onClick={test}>test</button>
    </div>
  )
}

export default FeedWrapper
