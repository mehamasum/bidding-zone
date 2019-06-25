import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;
