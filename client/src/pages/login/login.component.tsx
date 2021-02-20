import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInStart } from '../../redux/auth/auth.actions';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [userCredencials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredencials;
  const dispatch = useDispatch();
  const submitHandler = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await dispatch(signInStart(userCredencials));
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
      <input type="submit" value="Submit" />
    </form>
  );
};
export default Login;
