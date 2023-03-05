import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context'
export const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext)
  return auth.auth ? <Outlet /> : <Navigate to='/' />
}
