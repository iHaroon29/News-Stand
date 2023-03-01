import decode from 'jwt-decode'

export const decodeJWT = (token) => {
  return decode(token)
}
