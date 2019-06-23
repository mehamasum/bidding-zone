import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles';
import Typography from '@material-ui/core/Typography';

function LoginForm(props) {
  const { values, classes, onChange, onSubmit } = props;

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Login to Bidding-Zone
      </Typography>

      <form onSubmit={onSubmit}>
        <TextField
          required
          label={'Username'}
          type="text"
          fullWidth
          value={values['username']}
          onChange={onChange('username')}
          className={classes.formItem}
        />

        <TextField
          required
          label={'Password'}
          type="password"
          fullWidth
          value={values['password']}
          onChange={onChange('password')}
          className={classes.formItem}
        />

        <Button
          color="secondary"
          variant="contained"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Login
        </Button>
      </form>
    </React.Fragment>
  );
}

export default withStyles(styles)(LoginForm);
