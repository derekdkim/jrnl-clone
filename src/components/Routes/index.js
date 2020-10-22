import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthBox from '../signedOut/AuthBox';
import TimelineTab from '../signedIn/Timeline/TimelineTab';
import JournalsTab from '../signedIn/Journals/JournalsTab';
import BooksTab from '../signedIn/Books/BooksTab';
import AAMTab from '../signedIn/AAM/AAMTab';
import SettingsTab from '../signedIn/Settings/SettingsTab';

const Routes = () => {
  return(
    <Switch>
      <Route path='/timeline' component={TimelineTab}/>
      <Route path='/journals' component={JournalsTab}/>
      <Route path='/books' component={BooksTab}/>
      <Route path='/all-about-me' component={AAMTab}/>
      <Route path='/account/settings' component={SettingsTab}/>
      <Route path='/signup' render={() => <AuthBox tab='signup'/>} />
      <Route path='/login' render={() => <AuthBox tab='login'/>} />
    </Switch>
  );
}

export default Routes;