import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from './components/spinner/spinner.component';
import Profile from './pages/profile/profile.component';
import Home from './pages/home/home.component';
import Login from './pages/login/login.component';
import Logout from './pages/logout/logout.component';
import Register from './pages/register/register.component';
import { RootState } from './redux/root-reducer';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);

  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {isLoggedIn ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/logout" component={Logout} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
