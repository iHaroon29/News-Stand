import React from 'react'
import { Button } from './Components'
const Test = () => {
  const sendRequest = async () => {
    try {
    } catch (e) {
      console.log(e)
    }
  }
  return (
    // <div>Test</div>
    <Button onClick={sendRequest}>test</Button>
  )
}

export default Test
