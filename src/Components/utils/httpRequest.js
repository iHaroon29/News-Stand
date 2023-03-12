import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
})

export const authenticate = async (token) => {
  try {
    axiosInstance.defaults.headers.authorization = `Bearer ${token}`
    const resp = await axiosInstance({ url: '/auth/validate' })
    return resp
  } catch (e) {
    console.log(e.message)
  }
}

export const refresh = async () => {
  try {
    const resp = await axiosInstance({
      url: `/auth/refresh`,
    })
    return resp
  } catch (e) {
    return e
  }
}

export const signup = async (data) => {
  return axiosInstance({
    url: '/auth/signup',
    data,
    method: 'POST',
  })
}

export const login = async (data) => {
  return axiosInstance({
    url: '/auth/login',
    data,
    method: 'POST',
  })
}

export const logout = async () => {
  return axiosInstance({ url: '/auth/logout' })
}

axiosInstance.interceptors.response.use(
  (resp) => {
    return resp
  },
  async (e) => {
    const originalConfig = e.config
    if (e.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      try {
        const { data } = await refresh(localStorage.getItem('refresh'))
      } catch (e) {
        console.log(e.message)
      }
    }
  }
)
