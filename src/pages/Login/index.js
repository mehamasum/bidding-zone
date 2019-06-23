import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider';
import LoginForm from './LoginForm';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Paper } from '@material-ui/core';
import axios from 'axios';

function Login(props) {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const { isAuthenticated, onLoginSuccess } = useContext(AuthContext);
  const onInputChange = name => e => {
    const _value = e.target.value;
    setValues({
      ...values,
      [name]: _value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const config = {
      headers: { 'content-type': 'application/json' }
    };

    axios
      .post('/api/login/', JSON.stringify(values), config)
      .then(response => {
        onLoginSuccess(response.data.token);
      })
      .catch(error => {
        if(error.response.data && error.response.data.non_field_errors)
          alert(error.response.data.non_field_errors[0]);
        console.log('Login failed', error, error.response);
      });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className={props.classes.root}>
      <Paper className={props.classes.container}>
        <LoginForm onSubmit={onSubmit} onChange={onInputChange} values={values} />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Login);
