import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContextProvider.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuthContext();

  return (
    <Route {...rest} render={(props) => (
      auth.loggedIn === true
        ? <Component {...props} />
        : <Redirect to='/login/' />
    )} />
  )
};

export default PrivateRoute;