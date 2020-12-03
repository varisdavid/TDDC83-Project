import React from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Loading} from './components';
import { Overview, OverviewSettings, PatientView } from './views';
import axios from "axios"
import ProtectedRoute from './auth/ProtectedRoute';

import './app.css';

const App = () => {

  const { isLoading, getAccessTokenSilently, isAuthenticated} = useAuth0();

  if ( isAuthenticated ) {
    const token =  getAccessTokenSilently(); 
    token.then(value => {axios.defaults.headers.common["Authorization"] = `Bearer ${value}`} )
    console.log(token); 
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div id='app' className='d-flex flex-column h-100'>
        <Switch>
          <ProtectedRoute path={['/patient/overview', '/patient/measurements', '/patient/medications', '/patient/calendar', '/patient/admin']} component={PatientView}/>
          <ProtectedRoute exact path='/overview/settings' component={OverviewSettings} />
          <ProtectedRoute path={[ '/', '/overview/my_patients', '/overview/all_patients', '/overview/notices', 'overview/calendar']} component={Overview}/>
        </Switch>
      </div>
    );
  }

};
export default App;
