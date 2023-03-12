import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Wrapper } from '../Components'

const BlogPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    console.log(window.location.href)
  }, [])
  return (
    <Wrapper>
      <h2>Hello</h2>
    </Wrapper>
  )
}

export default BlogPage
