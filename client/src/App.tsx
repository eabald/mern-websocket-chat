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
import ErrorsOutlet from './components/errorsOutlet/errorsOutlet.component';
import Spinner from './components/spinner/spinner.component';

const App: React.FC = () => (
  <PersistGate loading={<Spinner />} persistor={persistor}>
    <ThemeProvider theme={MainTheme}>
      <ErrorsOutlet />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </PersistGate>
);

export default App;
