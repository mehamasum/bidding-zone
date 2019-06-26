import React, { useContext, useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import ItemSearch from '../../components/ItemSearch';
import AuctionableContainer from '../../components/ItemList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(4),
    }
}));

export default function Home(props) {
    const classes = useStyles();
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [categories, setCategories] = React.useState([
        {
            value: "",
            label: "All categories"
        }
    ]);

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    function handleQueryChange(e) {
        console.log('handleQueryChange', e.target.value)
        setQuery(e.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        //console.log(query, selectedCategory);
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
                    onQueryChange={handleQueryChange} />
            </Navbar>

            <div className={classes.root}>
                {
                    query ? <>
                        <Typography variant="h5" gutterBottom>
                            Search results for <em>{query}</em> in <em>{selectedCategory === '' ? 'All categories' : selectedCategory}</em>
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