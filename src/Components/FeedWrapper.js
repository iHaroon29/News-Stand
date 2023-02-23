import React, { useEffect, useState } from 'react'
import Feed from './Feed'
const ws = new WebSocket('ws://localhost:8000/ws/feed')
const FeedWrapper = () => {
  const [updates, setUpdates] = useState([])
  const fetchFeed = (e) => {
    e.preventDefault()
    ws.send(JSON.stringify({ requestType: 'updates' }))
  }
  useEffect(() => {
    ws.onmessage = (response) => {
      const { responseType, data } = JSON.parse(response.data)
      if (responseType === 'ack') {
        return console.log(data)
      }
      if (responseType === 'notification') {
        return setUpdates(JSON.parse(data))
      }
    }
    ws.onerror = (e) => {
      console.log(e.message)
    }
    ws.onclose = () => {
      console.log('Connection Closed')
    }
    return () => {
      ws.close()
    }
  }, [])
  return (
    <div className='feed-wrapper'>
      <button className='test' onClick={fetchFeed}>
        Fetch
      </button>
      <div className='feed-left'>
        <div className='feed-scroll'>
          <Feed test='test' updates={updates} />
        </div>
      </div>
      <div className='feed-right'></div>
    </div>
  )
}

export default FeedWrapper
