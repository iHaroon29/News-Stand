import React, { useEffect } from 'react'
const ws = new WebSocket('ws://localhost:8000/ws/feed')

const Feed = () => {
  useEffect(() => {
    ws.onmessage = (data) => {
      console.log(data)
    }
    ws.onerror = (e) => {
      console.log(e.message)
    }
    ws.onclose = (code) => {
      console.log(code)
    }
    return () => {
      ws.close()
    }
  }, [])
}

export default Feed
