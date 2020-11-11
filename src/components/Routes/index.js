import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';

import AuthBox from '../signedOut/AuthBox';
import PasswordRecovery from '../signedOut/PasswordRecovery';
import TimelineTab from '../signedIn/Timeline/TimelineTab';
import JournalsTab from '../signedIn/Journals/JournalsTab';
import BooksTab from '../signedIn/Books/BooksTab';
import AAMTab from '../signedIn/AAM/AAMTab';
import SettingsTab from '../signedIn/Settings/SettingsTab';
import SingleEntryTab from '../signedIn/Timeline/SingleEntryTab';
import Profile from '../signedIn/Settings/Profile';
import Security from '../signedIn/Settings/Security';

import firebase from '../../Firebase.js';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
   if (firebase.auth().currentUser) {
     setLoggedIn(true);
   } else {
     setLoggedIn(false);
   }
  }, [loggedIn]);

  return(
    <Switch>
      <PrivateRoute exact path='/' component={() => <Redirect to='/timeline' />} ></PrivateRoute>
      <PrivateRoute exact path='/timeline' component={TimelineTab}/>
      <PrivateRoute path='/timeline/view/:id' component={() => <SingleEntryTab viewMode={true}/>} />
      <PrivateRoute path='/timeline/edit/:id' component={() => <SingleEntryTab viewMode={false}/>} />
      <PrivateRoute path='/journals' component={() => <JournalsTab tab='journals'/>} />
      <PrivateRoute path='/tags' component={() => <JournalsTab tab='tags'/>} />
      <PrivateRoute path='/books' component={() => <BooksTab tab='books'/>} />
      <PrivateRoute path='/book-orders' component={() => <BooksTab tab='orders'/>} />
      <PrivateRoute path='/all-about-me' component={AAMTab}/>
      <PrivateRoute exact path='/account/settings' component={SettingsTab}/>
      <PrivateRoute path='/account/profile' component={Profile}/>
      <PrivateRoute path='/account/settings/security' component={Security}/>
      <Route path='/signup' render={() => <AuthBox tab='signup'/>} />
      <Route path='/login' render={() => <AuthBox tab='login'/>} />
      <Route path='/forgot-password' component={PasswordRecovery}/>
    </Switch>
  );
}

export default Routes;