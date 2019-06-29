import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ItemDespription from './ItemDescription';
import ItemBids from './ItemBids';
import ItemImages from './ItemImages';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
    content: {
        margin: theme.spacing(4),
    }
}));

export default function ItemDetailsPage(props) {
    const { token } = useContext(AuthContext);
    const classes = useStyles();

    const [loadingItem, setLoadingItem] = useState(false);
    const [item, setItem] = useState(null);

    const [bid, setBid] = React.useState(null);
    const [placingBid, setPlacingBid] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(null);

    const handleMessageClose = e => {
        setOpenMessage(null);
    }

    const handleBidChange = event => {
        setBid(event.target.value);
    };

    const handleBidSubmit = event => {
        event.preventDefault();
        if (!item) return;

        setPlacingBid(true);
        axios
            .post(`/api/auctionables/${item.id}/place_bid/`, JSON.stringify({
                amount: bid
            }), {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                })
            .then(response => {
                setPlacingBid(false);
                setOpenMessage("Your bid is placed!");
            })
            .catch(error => {
                setPlacingBid(false);
                if (error.response.data && error.response.data.amount)
                    setOpenMessage(error.response.data.amount[0]);
                console.log('Bid placing failed', error, error.response);
            });
    };

    useEffect(() => {
        setLoadingItem(true);
        axios
            .get(`/api/auctionables/${props.match.params.id}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setLoadingItem(false);
                setItem(response.data);
            })
            .catch(error => {
                console.log('Fetch auctionable failed', error, error.response);
            });
    }, []);


    return (
        <div>
            <Navbar />

            <div className={classes.content}>
                <Grid container spacing={2}>
                    {
                        loadingItem ?
                            <LinearProgress /> : null
                    }
                    {
                        item ?
                            (<>
                                <Grid item xs={12} sm={6} lg={4} data-testid="item-container">
                                    <ItemImages item={item} />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={8} data-testid="item-container">
                                    <ItemDespription
                                        item={item}
                                        placingBid={placingBid}
                                        handleBidSubmit={handleBidSubmit}
                                        handleBidChange={handleBidChange} />
                                </Grid>
                                <Grid item xs={12} sm={6} data-testid="item-container">
                                    <ItemBids item={item} />
                                </Grid>
                            </>) : null
                    }

                </Grid>
            </div>
            <Snackbar
                data-testid="toast-msg"
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