import React, { useContext, useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import CategorySelect from '../../components/CategorySelect';
import ItemList from '../../components/ItemList';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Home() {
    const { token } = useContext(AuthContext);
    const [loadingInterestingItems, setLoadingInterestingItems] = useState(false);
    const [interestingItems, setInterestingItems] = useState(null);
    const [page, setPage] = useState(0);
    const [prevPage, setPrevPage] = useState(-1);

    useEffect(() => {
        setLoadingInterestingItems(true);
        axios
            .get(`/api/auctionables/${interestingItems && page ?
                new URL(page - prevPage > 0 ?
                    interestingItems.next :
                    interestingItems.previous
                ).search : ''}`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
            .then(response => {
                setLoadingInterestingItems(false);
                console.log(response.data);
                setInterestingItems(response.data);
            })
            .catch(error => {
                console.log('Fetch auctionables failed', error, error.response);
            });
    }, [page]);

    const fetchMore = (forward) => e => {
        console.log(forward);
        setPrevPage(page);
        setPage(forward ? page + 1 : page - 1);
    }

    return (
        <div>
            <Navbar><CategorySelect /></Navbar>
            <div>
                {
                    loadingInterestingItems ?
                        'Loading' :
                        interestingItems ?
                            <ItemList items={interestingItems.results} /> : null
                }
                {interestingItems && (
                    <>
                        <IconButton
                            disabled={!interestingItems.previous}
                            color="primary"
                            onClick={fetchMore(false)}
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <IconButton
                            disabled={!interestingItems.next}
                            color="primary"
                            onClick={fetchMore(true)}
                        >
                            <KeyboardArrowRight />
                        </IconButton>
                    </>
                )}
            </div>
        </div>
    );
}