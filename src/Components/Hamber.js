import React from 'react'

const Hamber = (props) => {
  const { animate } = props
  return (
    <div className='hamber-holder'>
      <span className={animate ? 'bar rotateC' : 'bar'}></span>
      <span className={animate ? 'bar exit' : 'bar'}></span>
      <span className={animate ? 'bar rotateAC' : 'bar'}></span>
    </div>
  )
}

export default Hamber
