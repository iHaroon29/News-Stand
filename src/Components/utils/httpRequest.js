import axios from 'axios'

export const httpRequest = async ({
  url,
  headers = null,
  method,
  data = null,
}) => {
  const baseURL = 'http://localhost:8000/api/v1'
  try {
    const response = await axios({
      baseURL,
      url,
      data,
      headers,
      method,
    })
    return response
  } catch (e) {
    return e
  }
}
