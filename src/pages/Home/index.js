import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar';
import ItemSearch from '../../components/ItemSearch';
import AuctionableContainer from '../../components/ItemList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import debounce from 'lodash.debounce';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(4),
    }
}));

export default function Home(props) {
    const { token } = useContext(AuthContext);
    const classes = useStyles();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([
        {
            value: "",
            label: "All categories"
        }
    ]);

    useEffect(() => {
        axios
            .get(`/api/categories/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                console.log(response.data);
                setCategories([{
                    id: "",
                    name: "All categories"
                },
                ...response.data.results]);
            })
            .catch(error => {
                console.log('Fetch categories failed', error, error.response);
            });
    }, []);

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    function handleQueryChange(q) {
        console.log('handleQueryChange', q)
        setQuery(q);
    }

    function onSubmit(event) {
        event.preventDefault();
    }

    const onDetailsClick = item => {
        props.history.push(`/items/${item.id}/`);
    }

    return (
        <div>
            <Navbar>
                <ItemSearch
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSubmit={onSubmit}
                    onChange={handleCategoryChange}
                    onQueryChange={debounce(handleQueryChange, 500)} />
            </Navbar>

            <div className={classes.root}>
                {
                    query ? <>
                        <Typography variant="h5" gutterBottom>
                            Search results for <em>{query}</em> in <em>{selectedCategory === '' ? 'All categories' : categories.find(cat => cat.id === selectedCategory).name}</em>
                        </Typography>
                        <AuctionableContainer
                            key={query + selectedCategory}
                            url={`/api/auctionables/?name=${query}&category=${selectedCategory}`}
                            onDetailsClick={onDetailsClick} />
                        <br />
                    </> : null
                }

                <Typography variant="h5" gutterBottom>
                    Items you might like
            </Typography>
                <AuctionableContainer
                    url={`/api/auctionables/`}
                    onDetailsClick={onDetailsClick} />
            </div>
        </div>
    );
}