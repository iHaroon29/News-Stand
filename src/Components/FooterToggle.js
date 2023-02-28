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
`

const FooterToggle = (props) => {
  return (
    <ToggleWrapper>
      {props.isActive ? <FaQuestion /> : <GrClose />}
    </ToggleWrapper>
  )
}

export default FooterToggle
