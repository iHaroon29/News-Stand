import React, { useState } from 'react'

export const Form = (props) => {
  const [input, setInput] = useState({ username: '', password: '', email: '' })
  const formhandler = (e) => {
    e.preventDefault()
    console.log(input)
  }
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }
  return (
    <form className='input-form' id='inpurForm' onSubmit={formhandler}>
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
    </form>
  )
}

export default Form
