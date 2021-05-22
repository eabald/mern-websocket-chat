// React
import React, { lazy } from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from './redux/root-reducer';
// External
import { Location } from 'history';
// I18N
import { useTranslation } from 'react-i18next';
// Components
import LoggedInRoutes from './routes/loggedInRoutes';
import LoggedOutRoutes from './routes/loggedOutRoutes';
const LangPicker = lazy(() => import('./components/langPicker/langPicker.component'));

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
      {isLoggedIn ? (
        <LoggedInRoutes background={background} location={location} />
      ) : (
        <LoggedOutRoutes background={background} location={location} />
      )}
      <LangPicker />
    </>
  );
};

export default Router;
