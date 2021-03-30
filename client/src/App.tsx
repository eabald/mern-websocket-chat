// React
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
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
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Loader />
    </ThemeProvider>
  </PersistGate>
);

export default App;
