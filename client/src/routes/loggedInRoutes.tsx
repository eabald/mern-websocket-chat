// React
import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// I18N
import { useTranslation } from 'react-i18next';
// Context
import { SocketContext, socket } from '../context/socket';
// Components
import NotFound from '../pages/notFound/notFound.component';
const Profile = lazy(() => import('../pages/profile/profile.component'));
const Home = lazy(() => import('../pages/home/home.component'));
const Logout = lazy(() => import('../pages/logout/logout.component'));
const TermsAndConditions = lazy(
  () => import('../pages/termsAndConditions/termsAndConditions.component')
);
const AddNewRoom = lazy(
  () => import('../pages/addNewRoom/addNewRoom.component')
);
const AddNewDm = lazy(() => import('../pages/addNewDm/addNewDm.component'));
const UserDetails = lazy(
  () => import('../pages/userDetails/userDetails.component')
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
const InviteNewUser = lazy(
  () => import('../pages/inviteNewUser/inviteNewUser.component')
);
const BuyRegistration = lazy(
  () => import('../pages/buyRegistration/buyRegistration.component')
);

type LoggedInRoutesProps = {
  background: any;
  location: any;
};

const LoggedInRoutes: React.FC<LoggedInRoutesProps> = ({
  background,
  location,
}) => {
  const { t } = useTranslation();
  return (
    <SocketContext.Provider value={socket}>
      <Switch location={background || location}>
        <Route path={`/${t('login')}`}>
          <Redirect to='/' />
        </Route>
        <Route path='/register'>
          <Redirect to='/' />
        </Route>
        <Route path='/verify'>
          <Redirect to='/' />
        </Route>
        <Route
          path={`/${t('reset-password')}`}
          component={ResetPassword}
        ></Route>
        <Route path={`/${t('change-password')}`} component={ChangePassword}>
          <Redirect to='/' />
        </Route>
        <Route path={`/${t('logout')}`} component={Logout} />
        <Route
          path={`/${t('terms-and-conditions')}`}
          component={TermsAndConditions}
        />
        <Route
          path={`/${t('missing-invitation')}`}
          component={MissingInvitation}
        >
          <Redirect to='/' />
        </Route>
        <Route path={`/${t('buy-registration')}`} component={BuyRegistration}>
          <Redirect to='/' />
        </Route>
        <Route path='/' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
      {background && (
        <Route
          path={`/${t('profile')}`}
          component={Profile}
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('invite-user')}`}
          component={InviteNewUser}
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('add-new-room')}`}
          component={AddNewRoom}
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('add-new-dm')}`}
          component={AddNewDm}
        />
      )}
      {background && (
        <Route
          path={`/modal/${t('user-details')}/:id`}
          component={UserDetails}
        />
      )}
    </SocketContext.Provider>
  );
};
export default LoggedInRoutes;
