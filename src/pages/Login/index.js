import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider';

function Login(props) {
  const { isAuthenticated, onLoginSuccess } = useContext(AuthContext);

  const onSubmit = (e) => {
      e.preventDefault();
      setTimeout(()=> {
        onLoginSuccess('fakeToken');
      }, 1000)
  }

  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <div>
      Login to Movie App
        <form onSubmit={onSubmit}>
            Email: <input type="text" name="email"/><br/>
            Password: <input type="password" name="lname"/><br/>
            <input type="submit" value="Login"/>
        </form>
    </div>
  );
}

export default Login;
