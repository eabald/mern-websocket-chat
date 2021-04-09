// React
import React, { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { verifyStart } from '../../redux/auth/auth.actions';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// Styled
import { VerifyEmailWrapper } from './verifyEmail.styles';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Components
import SmallHeader from '../../components/smallHeader/smallHeader.component';

type VerifyEmailProps = {};

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
  const dispatch = useDispatch();
  const token = useSearchParams().get('token');
  useEffect(() => {
    if (token) {
      dispatch(verifyStart(token));
    }
  });
  return (
    <MainLayout>
      <VerifyEmailWrapper>
        <SmallHeader>Verifying email...</SmallHeader>
      </VerifyEmailWrapper>
    </MainLayout>
  );
};

export default VerifyEmail;
