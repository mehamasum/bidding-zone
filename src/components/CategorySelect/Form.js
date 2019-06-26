import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    height: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  select: {
    borderRadius: 4,
    backgroundColor: 'inherit',
    color: 'inherit',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: 120,
      paddingLeft: 0,
      paddingRight: 0,
    },
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off" onSubmit={props.onSubmit}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search item by title..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onChange={props.onQueryChange}
          endAdornment={(<InputAdornment>
            <FormControl className={classes.formControl}>
              <Select
                value={props.selectedCategory}
                onChange={props.onChange}
                displayEmpty
                name="category"
                className={classes.select}
              >
                {
                  props.categories.map(
                    item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </InputAdornment>)}
        />
      </div>

    </form>
  );
}