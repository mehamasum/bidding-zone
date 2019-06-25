import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemPreview from './ItemPreview';


const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    }
});

const List = props => {
    const onDetailsClick = item => e => {
        props.onDetailsClick(item);
    };

    const { classes, items } = props;
    if (items.length === 0)
        return <Typography variant="h5">No items</Typography>;

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ItemPreview
                            item={item}
                            onDetailsClick={onDetailsClick(item)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default withStyles(styles)(List);