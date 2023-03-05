import React from 'react'
import styled from 'styled-components'

const HamberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: pointer;
  transition: 0.5s all;
  z-index: 2;
  padding: 5px;
  .bar {
    width: 90%;
    height: 3px;
    display: block;
    background: white;
    opacity: 1;
    transition: 0.5s ease;
  }
  .exit {
    opacity: 0;
  }

  .rotateC {
    transform-origin: top left;
    translate: 5px 0px;
    transform: rotate(45deg);
  }
  .rotateAC {
    transform: rotate(-45deg);
    transform-origin: bottom left;
    translate: 5px 1px;
  }
`
const Hamber = (props) => {
  const { animate, background, state } = props
  return (
    <HamberWrapper
      background={background}
      onClick={state.updateAboutState}
      className={!state.animate ? 'uncurve' : 'curve'}
    >
      <span className={animate ? 'bar rotateC' : 'bar'}></span>
      <span className={animate ? 'bar exit' : 'bar'}></span>
      <span className={animate ? 'bar rotateAC' : 'bar'}></span>
    </HamberWrapper>
  )
}

export default Hamber
