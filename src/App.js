import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "./components";
import { Home, Profile, ExternalApi, PatientOverview } from "./views";
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
        <ProtectedRoute path="/overview" component={PatientOverview} /> {/* Just a starting point, could be dashboard, patients etc .. */}
      </Switch>
    </div>
  );
};

export default App;
