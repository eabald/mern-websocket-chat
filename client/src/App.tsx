import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/navbar/navbar.component'
import Profile from './pages/profile/profile.component'
import Home from './pages/home/home.component'
import Login from './pages/login/login.component';
import Logout from './pages/logout/logout.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
