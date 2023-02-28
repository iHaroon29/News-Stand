import React, { useState, useEffect } from 'react'
import { Notif } from './Notif'
import Hamber from './Hamber'
import Onborading from './Onborading'
import FooterToggle from './FooterToggle'

const Landing = () => {
  const [visible, setVisible] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [animate, setAnimate] = useState(false)
  const updateFormState = () => {
    setOverlay((prev) => !prev)
    setVisible((prev) => !prev)
    setAnimate((prev) => !prev)
  }

  return (
    <div className='landing-wrapper'>
      <div
        className={!animate ? 'test uncurve' : 'test curve'}
        onClick={updateFormState}
      >
        <Hamber animate={animate} />
      </div>
      {overlay ? <div className='overlay'></div> : null}
      <div className='landing-image-holder'></div>
      <Onborading visible={visible} />
      <Notif />
      <FooterToggle isActive={false} />
    </div>
  )
}

export default Landing
