import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/auth/auth.actions';

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const [userCredencials, setUserCredentials] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
  });
  const { email, password, username, firstName, lastName } = userCredencials;
  const dispatch = useDispatch();
  const submitHandler = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await dispatch(signUpStart(userCredencials));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredencials, [name]: value });
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="email" onChange={changeHandler} name="email" value={email} />
      <input
        type="password"
        onChange={changeHandler}
        name="password"
        value={password}
      />
      <input
        type="text"
        onChange={changeHandler}
        name="username"
        value={username}
      />
      <input
        type="text"
        onChange={changeHandler}
        name="firstName"
        value={firstName}
      />
      <input
        type="text"
        onChange={changeHandler}
        name="lastName"
        value={lastName}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
export default Register;
