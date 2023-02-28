import { createContext } from 'react'
const AuthContext = createContext({ auth: false, token: '', userId: '' })

export default AuthContext
