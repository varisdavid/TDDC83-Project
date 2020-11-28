import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Loading} from './components';
import { Home, Profile, ExternalApi, Overview, OverviewSettings, PatientView } from './views';
import axios from "axios"
// import ProtectedRoute from './auth/ProtectedRoute';

import './app.css';

const App = () => {
  const { isLoading, getAccessTokenSilently, isAuthenticated} = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if(isAuthenticated)
  {
    const token =  getAccessTokenSilently(); 
    token.then(value => {axios.defaults.headers.common["Authorization"] = `Bearer ${value}`} )
    console.log(token); 
  }
  else 
  {
    delete axios.defaults.headers.common["Authorization"];
  }
  return (
    <div id='app' className='d-flex flex-column h-100'>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/external-api' component={ExternalApi} />
        <Route exact path='/overview/settings' component={OverviewSettings} />
        <Route path='/overview' component={Overview}/>
        <Route path='/patient' component={PatientView}/>

      </Switch>
    </div>
  );
};
export default App;
