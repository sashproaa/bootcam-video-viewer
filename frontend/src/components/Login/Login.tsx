import React, { useState } from 'react'

const initialState = {
  email: '',
  password:'',
}

const Login = () => {
  const [login, setLogin] = useState({...initialState});

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setLogin(prev=>({...prev, [name]:value}))
  }

  const onChangeSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogin({...initialState})
  }

  const { email, password } = login;

  return (
    <form onSubmit={onChangeSubmit}>
      <label>
        <p>Email</p>
        <input type="email" name='email' value={email} onChange={onChangeInput} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" name='password' value={password} onChange={onChangeInput} />
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login;
