// React
import React from 'react';
import ReactDOM from 'react-dom';
// App
import App from './App';
// Redux
import { Provider } from 'react-redux'
import { store } from './redux/store'
// External
import reportWebVitals from './reportWebVitals';
// SW
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
serviceWorkerRegistration.register();
