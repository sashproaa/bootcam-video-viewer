import React from 'react';

export interface Props {
  email: string;
  password: string;
  name?: string;
  loggedIn: boolean;
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({
  email,
  password,
  name,
  loggedIn,
  changeInput,
  changeSubmit,
}: Props) => {
  return (
    <form onSubmit={changeSubmit}>
      {!loggedIn && (
        <label>
          <p>Name</p>
          <input type='name' name='name' value={name} onChange={changeInput} />
        </label>
      )}
      <label>
        <p>Email</p>
        <input type='email' name='email' value={email} onChange={changeInput} />
      </label>
      <label>
        <p>Password</p>
        <input
          type='password'
          name='password'
          value={password}
          onChange={changeInput}
        />
      </label>
      <button type='submit'>{loggedIn ? 'Login' : 'Registration'}</button>
    </form>
  );
};

export default Form;
