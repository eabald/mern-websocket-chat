import React, { FC, ReactNode } from 'react';
import { AuthLayoutWrapper, AuthLayoutBox } from './auth.styles.layout';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => (
  <AuthLayoutWrapper>
    <AuthLayoutBox>{children}</AuthLayoutBox>
  </AuthLayoutWrapper>
);
export default AuthLayout;
