import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css'

import App from './App'
import store from './app/store'

import { initFacebookSdk, jwtInterceptor, errorInterceptor, history } from './features/users/facebook/_helpers';

// setup fake backend
import { fakeBackend } from './features/users/facebook/_helpers';

fakeBackend();

// enable interceptors for http requests
jwtInterceptor();
errorInterceptor();
// wait for facebook sdk before startup
initFacebookSdk().then(startApp);

function startApp() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}