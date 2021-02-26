import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../redux/auth/auth.actions';

import AuthLayout from '../../layout/auth/auth.layout';
import FreepikInfo from '../../components/freepikInfo/freepikInfo.component';
import LinkButton from '../../components/linkButton/linkButton.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import {
  LogoutWrapper,
  LogoutImageWrapper,
  LogoutTextWrapper,
  LogoutLinkWrapper,
  LogoutImage,
} from './logout.styles';

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutStart());
  }, [dispatch]);

  return (
    <AuthLayout>
      <LogoutWrapper>
        <LogoutImageWrapper>
          <LogoutImage />
        </LogoutImageWrapper>
        <LogoutTextWrapper>
          <SmallHeader>Logged out successfully</SmallHeader>
        </LogoutTextWrapper>
        <LogoutLinkWrapper>
          <LinkButton to='/login' type='block' text='Login again' />
        </LogoutLinkWrapper>
      </LogoutWrapper>
      <FreepikInfo />
    </AuthLayout>
  );
};
export default Logout;
