import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Notif } from './Notif'
import { OverlayWrapper, TypeWriter, Button } from './Components'
import Hamber from './Hamber'
import Onborading from './Onboarding'
import landingImg from '../Assets/5030031.jpg'
import { FadeIn } from './utils/animation'

const LandingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: #5da83a;
  justify-content: center;
  overflow: hidden;
  .landing-holder {
    display: flex;
    width: 80%;
    height: 85%;
    background: white;
    align-self: center;
    border-radius: 10px;
    .landing-image-holder {
      background-image: url(${landingImg});
      width: 50%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      margin: auto;
    }
    .landing-content-holder {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-self: center;
    }
  }
`

const Landing = () => {
  const [visible, setVisible] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [translate, setTranslate] = useState(false)
  const nodeRef = useRef(null)
  const updateAboutState = () => {
    setTranslate((prev) => !prev)
    setAnimate((prev) => !prev)
  }
  const updateFormState = () => {
    setOverlay((prev) => !prev)
    setVisible((prev) => !prev)
  }
  return (
    <LandingWrapper>
      <Hamber
        animate={animate}
        background='#282828'
        top='40px'
        left='40px'
        state={{ animate, updateAboutState }}
      />
      {overlay ? (
        <OverlayWrapper
          width='100%'
          height='100%'
          saturation='0.15'
          zIndex='0'
        />
      ) : null}
      <FadeIn
        state={!translate}
        timeout={500}
        className='case'
        nodeRef={nodeRef}
      >
        <div className='landing-holder' ref={nodeRef}>
          <div className='landing-image-holder'></div>
          <div className='landing-content-holder'>
            <TypeWriter
              width='100%'
              height='350px'
              text={[
                '"Pac-Man was invented by the designer Toru Iwatani while he was eating pizza."',
              ]}
              loop={true}
              duration={100}
              size='50px'
              underline={true}
            />
            <Button primary={true} onClick={updateFormState}>
              Try now!
            </Button>
          </div>
        </div>
      </FadeIn>
      <ToastContainer />
    </LandingWrapper>
  )
}

export default Landing
