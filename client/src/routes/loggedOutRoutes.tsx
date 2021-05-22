// React
import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// I18N
import { useTranslation } from 'react-i18next';
// Components
import NotFound from '../pages/notFound/notFound.component';
const Login = lazy(() => import('../pages/login/login.component'));
const Logout = lazy(() => import('../pages/logout/logout.component'));
const Register = lazy(() => import('../pages/register/register.component'));
const TermsAndConditions = lazy(
  () => import('../pages/termsAndConditions/termsAndConditions.component')
);
const VerifyEmail = lazy(
  () => import('../pages/verifyEmail/verifyEmail.component')
);
const ResetPassword = lazy(
  () => import('../pages/resetPassword/resetPassword.component')
);
const ChangePassword = lazy(
  () => import('../pages/changePassword/changePassword.component')
);
const MissingInvitation = lazy(
  () => import('../pages/missingInvitation/missingInvitation.component')
);
const BuyRegistration = lazy(
  () => import('../pages/buyRegistration/buyRegistration.component')
);

type LoggedOutRoutesProps = {
  background: any;
  location: any;
};

const LoggedOutRoutes: React.FC<LoggedOutRoutesProps> = ({
  background,
  location,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Switch location={background || location}>
        <Route path={`/${t('login')}`} component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/verify' component={VerifyEmail} />
        <Route path={`/${t('reset-password')}`} component={ResetPassword} />
        <Route path={`/${t('change-password')}`} component={ChangePassword} />
        <Route path={`/${t('logout')}`} component={Logout} />
        <Route
          path={`/${t('terms-and-conditions')}`}
          component={TermsAndConditions}
        />
        <Route
          path={`/${t('missing-invitation')}`}
          component={MissingInvitation}
        />
        <Route path={`/${t('buy-registration')}`} component={BuyRegistration} />
        <Route path='/' exact>
          <Redirect to={`/${t('login')}`} />
        </Route>
        <Route component={NotFound} />
      </Switch>
      {background && (
        <Route path={`/${t('profile')}`}>
          <Redirect to={`/${t('login')}`} />
        </Route>
      )}
      {background && (
        <Route path={`/modal/${t('invite-user')}`}>
          <Redirect to={`/${t('login')}`} />
        </Route>
      )}
      {background && (
        <Route path={`/modal/${t('add-new-room')}`}>
          <Redirect to={`/${t('login')}`} />
        </Route>
      )}
      {background && (
        <Route path={`/modal/${t('add-new-dm')}`}>
          <Redirect to={`/${t('login')}`} />
        </Route>
      )}
      {background && (
        <Route path={`/modal/${t('user-details')}/:id`}>
          <Redirect to={`/${t('login')}`} />
        </Route>
      )}
    </>
  );
};
export default LoggedOutRoutes;
