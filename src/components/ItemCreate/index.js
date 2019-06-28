import React, { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../components/AuthProvider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
    },
    formItem: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    upload: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    submit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    }
}));

export default function ProfilePage(props) {
    const classes = useStyles();
    const { values, handleChange, handleSubmit } = props;
    const { token } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/categories/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setCategories(response.data.results);
            })
            .catch(error => {
                console.log('Fetch categories failed', error, error.response);
            });
    }, []);

    return (
        <div>
            <form className={classes.container} onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    helperText="Type the name of your item..."
                    className={classes.formItem}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Description"
                    helperText="Add a description of your item..."
                    className={classes.formItem}
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="normal"
                    fullWidth
                    multiline
                    rowsMax="4"
                />
                <TextField
                    label="Units"
                    helperText="How many units of this item you want to sell?"
                    className={classes.formItem}
                    value={values.units}
                    onChange={handleChange('units')}
                    margin="normal"
                    fullWidth
                    type="number"
                />
                <TextField
                    select
                    label="Status"
                    className={classes.formItem}
                    value={values.status}
                    onChange={handleChange('status')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select the status of the item"
                    margin="normal"
                    fullWidth
                >
                    <MenuItem value="ON_AUCTION">
                        On Auction
                    </MenuItem>
                    <MenuItem value="SOLD">
                        Sold
                    </MenuItem>
                    <MenuItem value="HIDDEN">
                        Hidden
                    </MenuItem>
                </TextField>
                <TextField
                    select
                    label="Category"
                    className={classes.formItem}
                    value={values.category}
                    onChange={handleChange('category')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select the category of the item"
                    margin="normal"
                    fullWidth
                >
                    {categories.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Base price"
                    helperText="Bids should start from this price"
                    className={classes.formItem}
                    value={values.base_price}
                    onChange={handleChange('base_price')}
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { step: 0.01 } }}
                />

                <TextField
                    label="Ending date and time"
                    helperText="Auction will close on this date and time in UTC+0"
                    type="datetime-local"
                    value={values.ending}
                    onChange={handleChange('ending')}
                    className={classes.formItem}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    fullWidth
                />

                <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleChange('images')}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="outlined" component="span" className={classes.upload}>
                        Attach photos
                    </Button>
                </label>
                {
                    values.images ?
                        <> <br />{
                            Array.from(values.images).map(img =>
                                <div className={classes.formItem} key={img.name}>
                                    <span>
                                        <Typography variant="caption">
                                            <small>{img.name}</small>
                                        </Typography>
                                    </span>
                                    <br />
                                </div>)}
                        </> : null
                }


                <br />


                <Button variant="contained" color="primary" type="submit" className={classes.submit}>
                    Add item to auction
                </Button>
            </form>
        </div>
    );
}