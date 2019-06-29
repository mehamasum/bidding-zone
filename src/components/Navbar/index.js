import React, { useContext } from 'react';
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
import Link from '@material-ui/core/Link';
import axios from 'axios';


const Navbar = props => {
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
          <Menu {...menuProps} data-testid="profile-menu">
            <MenuItem onClick={onProfileClick} data-testid="profile-btn">Profile</MenuItem>
            <MenuItem onClick={onLogoutClick} data-testid="logout-btn">Logout</MenuItem>
          </Menu>
        ) : (
            <Menu {...menuProps} data-testid="profile-menu">
              <MenuItem onClick={onLoginClick} data-testid="login-btn">Login</MenuItem>
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
              data-testid="profile-menu-btn"
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

export default withStyles(styles)(Navbar);
