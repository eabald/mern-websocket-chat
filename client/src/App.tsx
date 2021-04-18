// React
import React from 'react';
import { Router as DomRouter } from 'react-router-dom';
// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import history from './redux/history';
// Styled Components
import { ThemeProvider } from 'styled-components';
import { MainTheme } from './themes/main.theme';
// Components
import Router from './router';
import FlashOutlet from './components/flashOutlet/flashOutlet.component';
import Loader from './components/loader/loader.component';

const App: React.FC = () => (
  <PersistGate loading={<Loader />} persistor={persistor}>
    <ThemeProvider theme={MainTheme}>
      <FlashOutlet />
      <DomRouter history={history}>
        <Router />
      </DomRouter>
      <Loader />
    </ThemeProvider>
  </PersistGate>
);

export default App;
