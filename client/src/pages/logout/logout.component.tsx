// React
import React, { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../redux/auth/auth.actions';
// I18N
import { useTranslation } from 'react-i18next';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Styled
import {
  LogoutWrapper,
  LogoutImageWrapper,
  LogoutTextWrapper,
  LogoutLinkWrapper,
  LogoutImage,
} from './logout.styles';
// Components
import FreepikInfo from '../../components/freepikInfo/freepikInfo.component';
import LinkButton from '../../components/linkButton/linkButton.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutStart());
  }, [dispatch]);

  return (
    <MainLayout>
      <LogoutWrapper>
        <LogoutImageWrapper>
          <LogoutImage />
        </LogoutImageWrapper>
        <LogoutTextWrapper>
          <SmallHeader>{t('Logged out successfully')}</SmallHeader>
        </LogoutTextWrapper>
        <LogoutLinkWrapper>
          <LinkButton to='/login' type='block' text={t('Login again')} />
        </LogoutLinkWrapper>
      </LogoutWrapper>
      <FreepikInfo />
    </MainLayout>
  );
};
export default Logout;
