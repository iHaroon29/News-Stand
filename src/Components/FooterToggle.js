import React from 'react'
import { FaCross, FaQuestion } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import styled from 'styled-components'

const ToggleWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: green;
  position: absolute;
  bottom: 100px;
  left: 100px;
  display:flex;
  align-items:center;
  justify-content:center;
`

const FooterToggle = (props) => {
  const {isActive} = props
  return (
    <ToggleWrapper>
      {props.isActive ? <GrClose /> : <FaQuestion />}
    </ToggleWrapper>
  )
}

export default FooterToggle
