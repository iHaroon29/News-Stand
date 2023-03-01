import React, { useState } from 'react'
import { Button, Loading } from './Components'
import AuthContext from './context'
import { useNavigate } from 'react-router-dom'
import { decodeJWT } from './utils/jwt'
import { httpRequest } from './utils/httpRequest'

const Onborading = ({ visible }) => {
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState(false)
  const updateFormState = (e) => {
    if (e.target.value === 'signup') setFormState(false)
    else setFormState(true)
  }

  return !loading ? (
    <>
      <div
        className={
          visible
            ? 'visible onboarding-wrapper'
            : 'no-visible onboarding-wrapper'
        }
      >
        <div className={formState ? 'move right' : 'move left'}></div>
        <div className='onboarding-left'>
          {!formState ? (
            <Form login={false} setLoading={setLoading} />
          ) : (
            <Content login={false} update={updateFormState} />
          )}
        </div>
        <div className='onboarding-right'>
          {formState ? (
            <Form login={true} setLoading={setLoading} />
          ) : (
            <Content login={true} update={updateFormState} />
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  )
}

const Content = (props) => {
  return (
    <div className='content-wrapper'>
      <h2>
        {props.login ? 'Already have an account?' : "Don't have an account?"}
      </h2>
      <p>
        {props.login
          ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
          : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '}
      </p>
      <Button
        type='submit'
        primary={true}
        value={props.login ? 'login' : 'signup'}
        onClick={props.update}
      >
        {props.login ? 'Login' : 'Signup'}
      </Button>
    </div>
  )
}

const Form = (props) => {
  const { setLoading } = props
  const [input, setInput] = useState({ email: '', password: '', username: '' })
  const navigate = useNavigate()
  const url = `/auth/${props.login ? 'login' : 'signup'}`
  const formHandler = async (e, setAuthState) => {
    setLoading((prev) => !prev)
    e.preventDefault()
    const response = await httpRequest({
      url,
      method: 'POST',
      data: input,
    })
    if (response instanceof Error) {
      setLoading((prev) => !prev)
      return console.log(response)
    }
    setAuthState((prev) => {
      return {
        ...prev,
        auth: response.data.authorization,
        token: response.data.accessToken,
        userId: decodeJWT(response.data.accessToken).data,
      }
    })
    setLoading((prev) => !prev)
    navigate('/feed')
  }
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }
  return (
    <AuthContext.Consumer>
      {({ authState, setAuthState }) => {
        return (
          <div className='form-wrapper'>
            <form action='#' onSubmit={(e) => formHandler(e, setAuthState)}>
              <h2>{props.login ? 'LOG IN' : 'SIGN UP'}</h2>

              <input
                type='text'
                placeholder='Username'
                className='form-input'
                value={input.username}
                onChange={inputHandler}
                id='username'
              />
              {!props.login && (
                <input
                  type='email'
                  placeholder='Email'
                  className='form-input'
                  value={input.email}
                  onChange={inputHandler}
                  id='email'
                />
              )}
              <input
                type='password'
                placeholder='Password'
                className='form-input'
                value={input.password}
                onChange={inputHandler}
                id='password'
              />
              <Button type='submit' primary={true}>
                {props.login ? 'LOG IN' : 'SIGN UP'}
              </Button>
            </form>
          </div>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default Onborading
