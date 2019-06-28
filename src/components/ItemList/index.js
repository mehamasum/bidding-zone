import React, { useContext, useState, useEffect } from 'react';
import ItemList from './ItemList';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        zIndex: 1000,
        top: 0,
        right: 0,
        left: 0
    },
    content: {
        marginTop: theme.spacing(1)
    }
}));


export default function ItemContainer(props) {
    const { token } = useContext(AuthContext);
    const [loadingItems, setLoadingItems] = useState(false);
    const [items, setItems] = useState(null);
    const [page, setPage] = useState(0);
    const [prevPage, setPrevPage] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        setLoadingItems(true);
        let base = props.url;
        if (items) {
            base = props.url.split('?')[0] + new URL(page - prevPage > 0 ?
                items.next :
                items.previous
            ).search;
        };
        axios
            .get(`${base}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setLoadingItems(false);
                setItems(response.data);
            })
            .catch(error => {
                console.log('Fetch auctionables failed', error, error.response);
            });
    }, [page, props.url]);

    const fetchMore = (forward) => e => {
        window.scrollTo(0, 0);
        setPrevPage(page);
        setPage(forward ? page + 1 : page - 1);
    }

    return (
        <div className={classes.root}>
            {
                loadingItems ?
                    <LinearProgress className={classes.progress} /> : null
            }
            {
                items ?
                    <div className={classes.content}>
                        <ItemList
                            items={items.results}
                        />
                    </div> : null
            }
            {items && (
                <>
                    <IconButton
                        disabled={loadingItems || !items.previous}
                        color="primary"
                        onClick={fetchMore(false)}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        disabled={loadingItems || !items.next}
                        color="primary"
                        onClick={fetchMore(true)}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </>
            )}
        </div>
    );
}
