import React, { useState } from 'react'
import axios from 'axios'
import AuthContext from './context'
import { useNavigate } from 'react-router-dom'
export const Form = (props) => {
  const { classState } = props
  const reset = { username: '', password: '', email: '' }
  const navigate = useNavigate()
  const [input, setInput] = useState(reset)
  const formhandler = (e, authState, setAuthState) => {
    e.preventDefault()
    fetch(
      `http://localhost:8000/api/v1/auth/${props.login ? 'signup' : 'login'}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(input),
        method: 'POST',
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.authorization) {
          setAuthState({
            ...authState,
            auth: data.authorization,
            token: data.accessToken,
          })
          console.log(authState)
          localStorage.setItem('refresh', data.refreshToken)
          navigate('/feed')
        }
      })
      .catch((e) => console.log(e.message))
    setInput(reset)
  }
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }
  return (
    <AuthContext.Consumer>
      {({ authState, setAuthState }) => {
        return (
          <div className='input-form-holder'>
            <form
              className={classState ? 'input-form a' : 'input-form b'}
              id='inpurForm'
              onSubmit={(e) => {
                formhandler(e, authState, setAuthState)
              }}
            >
              <input
                type='text'
                onChange={inputHandler}
                value={input.username}
                id='username'
              />
              {!props.login ? null : (
                <input
                  type='email'
                  onChange={inputHandler}
                  value={input.email}
                  id='email'
                />
              )}
              <input
                type='password'
                onChange={inputHandler}
                value={input.password}
                id='password'
              />
              <button className='primary-btn' id='formSubmit'>
                Submit
              </button>
              In labore adipisci dignissimos, ut dolorem optio! Sapiente iusto
              impedit esse saepe quo veritatis excepturi, quia sint expedita
              neque quaerat labore blanditiis.
            </form>
          </div>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default Form
