import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import AuthContext from '../context'
import Blog from './Components/Blog'
import Feed from './Components/Feed'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Wrapper, Loading } from '../Components'
import { useNavigate } from 'react-router-dom'
import { authenticate, logout, refresh } from '../utils/httpRequest'
import { httpRequest } from '../utils/httpRequest'
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
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState([])
  const { auth, setAuth } = useContext(AuthContext)

  const userLogout = async () => {
    try {
      const resp = await logout()
      if (resp instanceof Error) {
        throw resp
      }
      setAuth((prev) => {
        return { ...prev, auth: false, token: '', userId: '' }
      })
      navigate('/')
    } catch (e) {
      toast.error(e.message, { position: 'top-right' })
    }
  }

  const userPublish = async () => {
    try {
      navigate(`/${auth.userId}/publish`)
    } catch (e) {
      toast.error(e.message, { position: 'top-right' })
    }
  }

  return (
    <Wrapper primary={true} display='flex'>
      <DashboardWrapper>
        <nav
          className='navbar'
          style={{
            gridArea: 'nav',
            borderBottom: '1px solid #00000058',
          }}
        >
          <Button primary={true} onClick={userLogout}>
            Logout
          </Button>
          <Button primary={true} onClick={userPublish}>
            Publish
          </Button>
        </nav>
        {/* <Feed /> */}

        <div
          className='friends'
          style={{
            gridArea: 'friends',
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
      <ToastContainer />
      {loading ? <Loading /> : null}
    </Wrapper>
  )
}

export default Dashboard
