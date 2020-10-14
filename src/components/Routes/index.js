import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthBox from '../signedOut/AuthBox';

const Routes = () => {
  return(
    <Switch>
      <Route exact path='/signup/' render={() => <AuthBox tab='signup'/>} />
      <Route exact path='/login/' render={() => <AuthBox tab='login'/>} />
    </Switch>
  );
}

export default Routes;