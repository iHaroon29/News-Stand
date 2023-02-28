import React, { useEffect, useState, useRef } from 'react'
import Feed from './Feed'
import Publish from './Publish'
import Tags from './Tags'
import { useNavigate } from 'react-router-dom'
const FeedWrapper = () => {
  const [updates, setUpdates] = useState([])
  const wsConnection = useRef(null)
  const navigate = useNavigate()
  const test = () => {
    navigate('/profile')
  }
  useEffect(() => {
    const socket = new WebSocket(
      'ws://localhost:8000/ws/feed?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjNmZDhkMTBhYjI0Y2Y3Yzc3ODAyZDY4IiwiaWF0IjoxNjc3NTgwNTM2LCJleHAiOjE2Nzc2ODg1MzZ9.NmRv6Kev6iZNOrvu_hJjHZPgKRxiFMsND6tsTe1_maI'
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
