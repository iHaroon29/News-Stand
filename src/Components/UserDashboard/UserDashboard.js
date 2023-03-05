import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../context'
import { httpRequest } from '../utils/httpRequest'
import { UserCard } from './Components/UserCard'
import placeholderImage from '../../Assets/placeholderprofile.jpg'
import { Loading, OverlayWrapper } from '../Components'
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
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    setLoading((prev) => !prev)
    ;(async () => {
      const response = await httpRequest({
        url: `/users/${auth.userId}/posts`,
        method: 'get',
        headers: { Authorization: 'Bearer ' + auth.token },
      })
      if (response instanceof Error) {
        return console.log(response)
      }
      setPosts(response.data.posts)
      setLoading((prev) => !prev)
    })()
  }, [auth.userId, auth.token])

  return (
    <DashboardWrapper>
      {loading ? (
        <OverlayWrapper width='100%' height='100%' saturation='0.2'>
          <Loading />
        </OverlayWrapper>
      ) : null}
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
      <UserActivity posts={posts} />
    </DashboardWrapper>
  )
}

export default UserDashboard
