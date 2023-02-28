import React from 'react'
import styled from 'styled-components'
import { UserCard } from './Components/UserCard'
import placeholderImage from '../../Assets/placeholderprofile.jpg'
import { OverlayWrapper } from '../Components'
import UserActivity from './Components/UserActivity'
const DashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #8080800a;
  position: relative;
  display: grid;
  grid-template-columns: repeat(5,20%);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: 
    "header header header header header"
    ". . sidebar sidebar sidebar"
    ". . sidebar sidebar sidebar"
    ". . sidebar sidebar sidebar"
}
`

const UserDashboard = () => {
  return (
    <DashboardWrapper>
      <div
        className='profile-landing-background'
        style={{
          background: `url(${placeholderImage})`,
          width: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          gridArea: 'header',
          boxShadow: '0px 0px 5px 1px grey',
          position: 'relative',
        }}
      >
        <OverlayWrapper width='100%' height='100%' saturation='0.15' />
      </div>
      <UserCard />
      <UserActivity />
    </DashboardWrapper>
  )
}

export default UserDashboard
