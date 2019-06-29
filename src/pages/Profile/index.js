import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ItemCreate from '../../components/ItemCreate';
import Snackbar from '@material-ui/core/Snackbar';
import { getApiCallError, getFieldValidationErrors } from '../../utils'

const useStyles = makeStyles(theme => ({
    content: {
        margin: theme.spacing(4),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function ProfilePage(props) {
    const { token } = useContext(AuthContext);
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        description: '',
        units: 1,
        status: 'ON_AUCTION',
        category: '',
        base_price: 0.00,
        ending: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        description: null,
        units: null,
        status: null,
        category: null,
        base_price: null,
        ending: null
    });

    const [openMessage, setOpenMessage] = React.useState(null);

    const handleMessageClose = e => setOpenMessage(null);

    const handleChange = name => event => {
        const files = event.target.files;
        if (files) {
            setValues({ ...values, [name]: files });
            console.log(files);

        } else {
            setValues({ ...values, [name]: event.target.value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);

        let formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'images') {
                Array.from(values[key]).forEach(
                    (img, index) => {
                        formData.append(`images_${index}`, img)
                    })
            } else {
                formData.append(key, values[key]);
            }
        })


        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios
            .post('/api/auctionables/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })
            .then(response => {
                setOpenMessage('Item added for auction');
                console.log(response.data);
            })
            .catch(error => {
                console.log('Add item failed', error, error.response);
                setOpenMessage(getApiCallError(error.response));
                setErrors(getFieldValidationErrors(error.response));
            });
    }

    return (
        <div>
            <Navbar />

            <div className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" gutterBottom>
                            Add an item for auction
                        </Typography>
                        <ItemCreate
                            values={values}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={!!openMessage}
                autoHideDuration={6000}
                onClose={handleMessageClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={openMessage}
            />
        </div>
    );
}