import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Loading } from "./components";
import { Home, Profile, ExternalApi, Overview, PatientView } from "./views";
import ProtectedRoute from "./auth/ProtectedRoute";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/external-api" component={ExternalApi} />
        <ProtectedRoute path="/overview">
          <Overview />
        </ProtectedRoute>
        <ProtectedRoute path="/patient" component={PatientView} />

      </Switch>
    </div>
  );
};

export default App;
