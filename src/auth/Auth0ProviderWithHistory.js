import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const domain = "dev-mlj1m1lm.eu.auth0.com";
  const clientId = "hTDLbigJVn6L1UJ2dwcKodjrU3l79dQx";
  const audience = "https://localhost:5000/api";

  // const redirectUri = process.env.REACT_APP_URI;
  const redirectUri = "http://localhost:3000";

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (

    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
