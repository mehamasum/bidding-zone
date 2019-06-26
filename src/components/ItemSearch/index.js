import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from './styles';
const useStyles = makeStyles(styles);

export default function SearchBox(props) {
  const classes = useStyles();

  const onQueryChange = (e) => {
    props.onQueryChange(e.target.value);
  }
  return (
    <form className={classes.root} autoComplete="off" onSubmit={props.onSubmit}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search items..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onChange={onQueryChange}
          endAdornment={(<InputAdornment>
            <FormControl className={classes.formControl}>
              <Select
                value={props.selectedCategory}
                onChange={props.onChange}
                displayEmpty
                name="category"
                className={classes.select}
                disableUnderline
              >
                {
                  props.categories.map(
                    item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
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