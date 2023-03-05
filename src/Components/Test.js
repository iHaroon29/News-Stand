import React from 'react'

import { Button } from './Components'
import { toast, ToastContainer } from 'react-toastify'
const Test = () => {
  return (
    <>
      <ToastContainer />
      <Button onClick={(e) => toast.error('hello')}>asdasd</Button>
    </>
  )
}

export default Test
