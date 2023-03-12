import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Loading } from '../Components'
import AuthContext from '../context'
import { refresh, axiosInstance } from './httpRequest'
export const PrivateRoute = ({ children, ...rest }) => {
  const { auth, setAuth } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const resp = await axios({
          baseURL: 'http://localhost:8000/api/v1',
          url: `/auth/refresh`,
        })
        if (resp instanceof Error) {
          throw resp
        }
        setAuth((prev) => {
          return {
            ...prev,
            token: resp.data.accessToken,
            auth: resp.data.authorization,
          }
        })
      } catch (e) {
        setLoading(false)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    !auth.auth ? verifyRefreshToken() : setLoading(false)
  }, [])

  return loading === true ? <Loading /> : <Outlet />
}
