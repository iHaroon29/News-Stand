import React from 'react'
import styled from 'styled-components'
import Blog from './Components/Blog'
import { Wrapper } from '../Components'
const DashboardWrapper = styled.div`
  width: 95%;
  height: 90%;
  margin: auto;
  background: white;
  display: grid;
  border-radius: 5px;
  overflow: hidden;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: 50px repeat(4, 1fr) 50px;
  grid-template-areas:
    'nav nav nav nav nav'
    'blog blog blog feeds feeds'
    'blog blog blog feeds feeds'
    'blog blog blog friends friends'
    'blog blog blog friends friends'
    'footer footer footer footer footer';
`
const Dashboard = () => {
  return (
    <Wrapper primary={true} display='flex'>
      <DashboardWrapper>
        <nav
          className='navbar'
          style={{
            gridArea: 'nav',
            borderBottom: '1px solid #00000058',
          }}
        ></nav>
        <div
          className='feeds'
          style={{
            gridArea: 'feeds',
            borderRadius: '20px',
            boxShadow: '0px 0px 5px 1px #00000056',
            margin: '10px',
          }}
        ></div>
        <Blog
          style={{
            gridArea: 'blog',
            borderRadius: '20px',
            boxShadow: '0px 0px 5px 1px #00000056',
            margin: '10px',
          }}
        />
        <div
          className='friends'
          style={{
            gridArea: 'friends',
            // background: 'purple',
            borderRadius: '20px',
            boxShadow: '0px 0px 5px 1px #00000056',
            margin: '10px',
          }}
        ></div>
        <div
          className='footer'
          style={{
            gridArea: 'footer',
            background: 'white',
            borderTop: '1px solid #00000058',
          }}
        ></div>
      </DashboardWrapper>
    </Wrapper>
  )
}

export default Dashboard
