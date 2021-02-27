import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from './components/spinner/spinner.component';
import Profile from './pages/profile/profile.component';
import Home from './pages/home/home.component';
import Login from './pages/login/login.component';
import Logout from './pages/logout/logout.component';
import Register from './pages/register/register.component';
import ErrorsOutlet from './components/errorsOutlet/errorsOutlet.component';
import { RootState } from './redux/root-reducer';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import { ThemeProvider } from 'styled-components';
import { MainTheme } from './themes/main.theme';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);

  return (
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <ThemeProvider theme={MainTheme}>
        <ErrorsOutlet />
        <BrowserRouter>
          <Switch>
            <Suspense fallback={<Spinner />}>
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
              <Route><Redirect to='/' /></Route>
            </Suspense>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  );
};

export default App;
