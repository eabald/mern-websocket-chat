// React
import React, { lazy } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from './redux/root-reducer';
// External
import { Location } from 'history';
// I18N
import { useTranslation } from 'react-i18next';
// Components
import NotFound from './pages/notFound/notFound.component';
const Profile = lazy(() => import('./pages/profile/profile.component'));
const Home = lazy(() => import('./pages/home/home.component'));
const Login = lazy(() => import('./pages/login/login.component'));
const Logout = lazy(() => import('./pages/logout/logout.component'));
const Register = lazy(() => import('./pages/register/register.component'));
const TermsAndConditions = lazy(
  () => import('./pages/termsAndConditions/termsAndConditions.component')
);
const AddNewRoom = lazy(
  () => import('./pages/addNewRoom/addNewRoom.component')
);
const AddNewDm = lazy(() => import('./pages/addNewDm/addNewDm.component'));
const UserDetails = lazy(
  () => import('./pages/userDetails/userDetails.component')
);
const VerifyEmail = lazy(
  () => import('./pages/verifyEmail/verifyEmail.component')
);
const ResetPassword = lazy(
  () => import('./pages/resetPassword/resetPassword.component')
);
const ChangePassword = lazy(
  () => import('./pages/changePassword/changePassword.component')
);
const LangPicker = lazy(
  () => import('./components/langPicker/langPicker.component')
);
const MissingInvitation = lazy(
  () => import('./pages/missingInvitation/missingInvitation.component')
);
const InviteNewUser = lazy(
  () => import('./pages/inviteNewUser/inviteNewUser.component')
);
const BuyRegistration = lazy(
  () => import('./pages/buyRegistration/buyRegistration.component')
);

type RouterProps = {};

interface StateType extends Location {
  background: any;
}

const Router: React.FC<RouterProps> = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const location = useLocation<StateType>();
  const shouldHaveBackground =
    location.pathname === `/${t('profile')}` ||
    location.pathname === `/modal/${t('invite-user')}` ||
    location.pathname === `/modal/${t('add-new-room')}` ||
    location.pathname === `/modal/${t('add-new-dm')}`;
  const fallbackBackgroundInState = useSelector(
    (state: RootState) => state.utils.fallbackBackground
  );
  const fallbackBackground = shouldHaveBackground
    ? fallbackBackgroundInState
    : null;
  const background =
    location.state && location.state.background
      ? location.state.background
      : fallbackBackground;
  return (
    <>
      <Switch location={background || location}>
        <Route path={`/${t('login')}`}>
          {isLoggedIn ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/register'>
          {isLoggedIn ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/verify'>
          {isLoggedIn ? <Redirect to='/' /> : <VerifyEmail />}
        </Route>
        <Route path={`/${t('reset-password')}`}>
          {isLoggedIn ? <Redirect to='/' /> : <ResetPassword />}
        </Route>
        <Route path={`/${t('change-password')}`}>
          {isLoggedIn ? <Redirect to='/' /> : <ChangePassword />}
        </Route>
        <Route path={`/${t('logout')}`} component={Logout}/>
        <Route
          path={`/${t('terms-and-conditions')}`}
          component={TermsAndConditions}
        />
        <Route path={`/${t('missing-invitation')}`}>
          {isLoggedIn ? <Redirect to={`/`} /> : <MissingInvitation />}
        </Route>
        <Route path={`/${t('buy-registration')}`}>
          {isLoggedIn ? <Redirect to={`/`} /> : <BuyRegistration />}
        </Route>
        <Route path='/' exact>
          {isLoggedIn ? <Home /> : <Redirect to={`/${t('login')}`} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
      {background && (
        <Route
          path={`/${t('profile')}`}
          children={
            isLoggedIn ? <Profile /> : <Redirect to={`/${t('login')}`} />
          }
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('invite-user')}`}
          children={
            isLoggedIn ? <InviteNewUser /> : <Redirect to={`/${t('login')}`} />
          }
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('add-new-room')}`}
          children={
            isLoggedIn ? <AddNewRoom /> : <Redirect to={`/${t('login')}`} />
          }
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('add-new-dm')}`}
          children={
            isLoggedIn ? <AddNewDm /> : <Redirect to={`/${t('login')}`} />
          }
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('user-details')}/:id`}
          children={
            isLoggedIn ? <UserDetails /> : <Redirect to={`/${t('login')}`} />
          }
        />
      )}
      <LangPicker />
    </>
  );
};

export default Router;
