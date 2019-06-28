import React, { useContext, useState, useEffect } from 'react';
import ItemList from './ItemList';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function ItemContainer(props) {
    const { token } = useContext(AuthContext);
    const [loadingInterestingItems, setLoadingInterestingItems] = useState(false);
    const [items, setItems] = useState(null);
    const [page, setPage] = useState(0);
    const [prevPage, setPrevPage] = useState(-1);

    useEffect(() => {
        setLoadingInterestingItems(true);
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
                setLoadingInterestingItems(false);
                setItems(response.data);
            })
            .catch(error => {
                console.log('Fetch auctionables failed', error, error.response);
            });
    }, [page, props.url]);

    const fetchMore = (forward) => e => {
        setPrevPage(page);
        setPage(forward ? page + 1 : page - 1);
    }

    return (
        <div>
            {
                loadingInterestingItems ?
                    <LinearProgress variant="query" /> : null
            }
            {
                items ?
                    <ItemList
                        items={items.results}
                    /> : null
            }
            {items && (
                <>
                    <IconButton
                        disabled={loadingInterestingItems || !items.previous}
                        color="primary"
                        onClick={fetchMore(false)}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        disabled={loadingInterestingItems || !items.next}
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
