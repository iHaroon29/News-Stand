import React from 'react'
import styled from 'styled-components'
import Blog from '../Dashboard/Components/Blog'
import { Wrapper } from '../Components'
const ComponentWrapper = styled.div`
  width: 90%;
  height: 100%;
  background: white;
  margin: auto;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Publish = () => {
  return (
    <Wrapper primary={true}>
      <ComponentWrapper>
        <Blog />
      </ComponentWrapper>
    </Wrapper>
  )
}

export default Publish
