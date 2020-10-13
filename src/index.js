import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProvierWithHistory from "./auth/Auth0ProviderWithHistory" // Auth0s own context with our info added

import App from './App';

import './tailwind.css';
import './index.css';


ReactDOM.render(

  <React.StrictMode>
    <Router>
      <Auth0ProvierWithHistory>
        <App />
      </Auth0ProvierWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
