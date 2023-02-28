import React, { useState } from 'react'
import { Button } from './Components'
import AuthContext from './context'
import { useNavigate } from 'react-router-dom'
const Onborading = (props) => {
  const { visible } = props

  const [formState, setFormState] = useState(false)
  const updateFormState = (e) => {
    if (e.target.value === 'signup') setFormState(false)
    else setFormState(true)
  }
  return (
    <div
      className={
        visible ? 'visible onboarding-wrapper' : 'no-visible onboarding-wrapper'
      }
    >
      <div className={formState ? 'move right' : 'move left'}></div>
      <div className='onboarding-left'>
        {!formState ? (
          <Form login={false} />
        ) : (
          <Content login={false} update={updateFormState} />
        )}
      </div>
      <div className='onboarding-right'>
        {formState ? (
          <Form login={true} />
        ) : (
          <Content login={true} update={updateFormState} />
        )}
      </div>
    </div>
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
  const navigate = useNavigate()
  const url = `http://localhost:8000/api/v1/auth/${
    props.login ? 'login' : 'signup'
  }`
  const [input, setInput] = useState({ email: '', password: '', username: '' })
  const headers = new Headers()
  headers.append('Content-type', 'application/json')
  const options = {
    headers,
    body: JSON.stringify(input),
    method: 'POST',
  }
  const formHandler = (e, authState, setAuthState) => {
    e.preventDefault()
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        setAuthState({
          ...authState,
          auth: data.authorization,
          token: data.accessToken,
        })
        navigate('/feed')
      })
      .catch((e) => console.log(e.message))
  }
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }
  return (
    <AuthContext.Consumer>
      {({ authState, setAuthState }) => {
        return (
          <div className='form-wrapper'>
            <form
              action='#'
              onSubmit={(e) => formHandler(e, authState, setAuthState)}
            >
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
