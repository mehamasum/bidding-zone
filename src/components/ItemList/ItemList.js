import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemPreview from './ItemPreview';


const styles = theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
});

const List = props => {
    const { classes, items } = props;
    if (items.length === 0)
        return <Typography variant="h6" color="textSecondary">No items found</Typography>;

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <ItemPreview
                            item={item}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default withStyles(styles)(List);