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
        backgroundColor: '#f2f3f4',
    },
    content: {
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


    return (
        <div className={classes.root}>
            <Navbar>
                <ItemSearch
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSubmit={onSubmit}
                    onChange={handleCategoryChange}
                    onQueryChange={debounce(handleQueryChange, 500)} />
            </Navbar>

            <div className={classes.content}>
                {
                    query ? <>
                        <Typography variant="h5" gutterBottom>
                            Search results for <em>{query}</em> in <em>{selectedCategory === '' ? 'All categories' : categories.find(cat => cat.id === selectedCategory).name}</em>
                        </Typography>
                        <AuctionableContainer
                            key={query + selectedCategory}
                            url={`/api/auctionables/?name=${query}&category=${selectedCategory}`}
                        />
                        <br />
                    </> : null
                }

                <Typography variant="h5" gutterBottom>
                    Items you might like
            </Typography>
                <AuctionableContainer
                    url={`/api/auctionables/`}
                />
            </div>
        </div>
    );
}