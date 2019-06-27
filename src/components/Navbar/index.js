import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { AuthContext } from '../AuthProvider';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router';
import Link from '@material-ui/core/Link';
import axios from 'axios';


const PrimarySearchAppBar = props => {
  const { token, onLogoutSuccess } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function onLoginClick() {
    handleMenuClose();
    props.history.push('/login');
  }

  function onLogoutClick() {
    handleMenuClose();
    axios
      .post('/api/logout/', null, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      })
      .then(response => {
        onLogoutSuccess();
      })
      .catch(error => {
        console.log('Logout failed', error, error.response);
      });
  }

  function onProfileClick() {
    handleMenuClose();
    props.history.push('/profile');
  }

  const { classes } = props;

  const renderMenu = () => {
    const menuProps = {
      anchorEl,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'right' },
      open: Boolean(anchorEl),
      onClose: handleMenuClose
    }
    return (
      <>
        {token ? (
          <Menu {...menuProps}>
            <MenuItem onClick={onProfileClick}>Profile</MenuItem>
            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
          </Menu>
        ) : (
            <Menu {...menuProps}>
              <MenuItem onClick={onLoginClick}>Login</MenuItem>
            </Menu>
          )}
      </>
    );
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            <Link color="inherit" href={'/'} className={classes.link}>
              Bidding Zone
            </Link>
          </Typography>
          {props.children ? props.children : null}
          <div className={classes.grow} />
          <div>
            <IconButton
              aria-owns={'material-appbar'}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          {renderMenu()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(PrimarySearchAppBar));
