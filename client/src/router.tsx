// React
import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from './redux/root-reducer';
// External
import { Location } from 'history';
// Components
import Profile from './pages/profile/profile.component';
import Home from './pages/home/home.component';
import Login from './pages/login/login.component';
import Logout from './pages/logout/logout.component';
import Register from './pages/register/register.component';
import TermsAndConditions from './pages/termsAndConditions/termsAndConditions.component';
import AddNewRoom from './pages/addNewRoom/addNewRoom.component';
import AddNewDm from './pages/addNewDm/addNewDm.component';

type RouterProps = {};

interface StateType extends Location {
  background: any;
}

const Router: React.FC<RouterProps> = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const location = useLocation<StateType>();
  const background = location.state ? location.state.background : '';
  return (
    <>
      <Switch location={background || location}>
        <Route path='/' exact>
          {isLoggedIn ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route path='/profile'>
          {isLoggedIn ? <Profile /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login'>
          {isLoggedIn ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/register'>
          {isLoggedIn ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/logout' component={Logout} />
        <Route path='/terms-and-conditions' component={TermsAndConditions} />
        {/* <Route><Redirect to='/' /></Route> */}
      </Switch>
      {background && <Route path='/modal/add-new-room' children={<AddNewRoom />} />}
      {background && <Route path='/modal/add-new-dm' children={<AddNewDm />} />}
    </>
  );
};

export default Router;
