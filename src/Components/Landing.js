import React, { useState, useEffect } from 'react'
import { Notif } from './Notif'
import { OverlayWrapper } from './Components'
import Hamber from './Hamber'
import Onborading from './Onborading'
import FooterToggle from './FooterToggle'

const Landing = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
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

      {overlay ? (
        <OverlayWrapper
          width='100%'
          height='100%'
          saturation='0.15'
          zIndex='0'
        />
      ) : null}
      <div className='landing-image-holder'></div>
      <Onborading visible={visible} loading={{ loading, setLoading }} />
      <Notif />
      <FooterToggle isActive={false} />
    </div>
  )
}

export default Landing
