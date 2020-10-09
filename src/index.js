import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(

  <Auth0Provider
    domain="dev-mlj1m1lm.eu.auth0.com"
    clientId="hTDLbigJVn6L1UJ2dwcKodjrU3l79dQx"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
    
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
