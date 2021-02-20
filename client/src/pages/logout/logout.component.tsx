import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../redux/auth/auth.actions';

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutStart());
  }, [dispatch]);

  return <div>logout</div>;
};
export default Logout;
