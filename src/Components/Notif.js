import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FaBell } from 'react-icons/fa'
const NotificationWrapper = styled.div`
  position: absolute;
  right: 45px;
  bottom: 100px;
  width: 200px;
  height: 500px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 10px;

  .notif-holder {
    position: absolute;
    transition: 0.5s ease;
    width: 196px;
    height: 400px;
    transition: 0.5s ease;
    box-shadow: 0px 0px 6px 1px grey;
    background: white;
    border-radius: 5px;
    padding: 5px;
    .notif {
      padding: 5px;
      box-shadow: 0px 0px 1px 1px grey;
      border-radius: 5px;
      margin: 0px 0px 10px 0px;
    }
  }
  .notif-icon-wrapper {
    cursor: pointer;
    display: flex;
    align-self: end;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 1px grey;
    transition: 0.5s ease;
    background: green;
    .bell-icon {
      margin: auto;
      font-size: 30px;
      color: white;
    }
    .notif-count-wrapper {
      position: absolute;
      top: 25%;
      left: 53%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: red;
      box-shadow: 0px 0px 1px 1px red;
      font-size: 15px;
      font-weight: 600;
    }
  }

  .show {
    right: 1%;
  }
  .hide {
    right: -101%;
  }
  .vibrate {
    animation-name: test;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-direction: normal;
  }

  @keyframes test {
    0% {
      transform: translate(0px);
    }
    10% {
      transform: translate(10px);
    }
    20% {
      transform: translate(-10px);
    }
    30% {
      transform: translate(10px);
    }
    40% {
      transform: translate(-10px);
    }
    50% {
      transform: translate(10px);
    }
    60% {
      transform: translate(-10px);
    }
    70% {
      transform: translate(10px);
    }
    80% {
      transform: translate(-10px);
    }
    90% {
      transform: translate(10px);
    }
    100% {
      transform: translate(0px);
    }
  }
`
export const Notif = (props) => {
  const [updates, setUpdates] = useState([])
  const [notifBar, setNotifBar] = useState(false)
  const [vibrate, setVibrate] = useState(false)
  const wsRef = useRef(null)
  const toggleNotif = () => {
    if (notifBar === false) {
      setNotifBar((prev) => !prev)
    } else {
      setNotifBar((prev) => !prev)
      setUpdates((prev) => [])
    }
  }
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/fake/feed')
    socket.onmessage = (response) => {
      const { responseType, data } = JSON.parse(response.data)
      if (responseType === 'pong') {
        setUpdates((prev) => [...prev, data])
        setVibrate(true)
      }
    }
    socket.onclose = () => {
      console.log('Connection closed')
    }
    socket.onerror = (e) => {
      console.log(e.message)
    }
    let test = setInterval(() => {
      socket.send(JSON.stringify({ requestType: 'ping' }))
      setVibrate(false)
    }, 50000)
    wsRef.current = socket
    return () => {
      localStorage.setItem('notif', JSON.stringify([]))
      clearInterval(test)
      socket.close()
    }
  }, [])
  return (
    <NotificationWrapper>
      <div className={notifBar ? 'show notif-holder' : 'hide notif-holder'}>
        {updates.map((node, index) => {
          return (
            <div className='notif' key={node.meta.userReferenceId + index}>
              <div className='notif-content-holder'>
                <h4>{node.meta.authorName} says:</h4>
                <p>
                  {node.description.split(' ').slice(0, 5).join(' ') + '...'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div
        onClick={toggleNotif}
        className={
          vibrate ? 'vibrate notif-icon-wrapper' : 'notif-icon-wrapper'
        }
      >
        <FaBell className='bell-icon' />
        {updates.length > 0 ? (
          <div className='notif-count-wrapper'>
            <span></span>
          </div>
        ) : null}
      </div>
    </NotificationWrapper>
  )
}
