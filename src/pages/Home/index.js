import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CategorySelect from '../../components/CategorySelect';
import ItemList from '../../components/ItemList';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';

export default function Home() {
    const { token } = useContext(AuthContext);
    const [loadingInterestingItems, setLoadingInterestingItems] = useState(false);
    const [interestingItems, setInterestingItems] = useState(null);

    useEffect(() => {
        setLoadingInterestingItems(true);
        axios
            .get('/api/auctionables/', {
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
    }, [])

    return (
        <div>
            <Navbar><CategorySelect /></Navbar>
            {
                loadingInterestingItems ?
                    'Loading' :
                    interestingItems ?
                        <ItemList items={interestingItems.results} /> : null
            }

        </div>
    );
}