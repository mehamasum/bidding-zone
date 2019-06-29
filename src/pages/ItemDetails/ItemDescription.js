import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Timer from '@material-ui/icons/Timer';
import Money from '@material-ui/icons/AttachMoney';
import StopWatch from '../../components/Stopwatch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';

const styles = theme => ({
    card: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    icon: {
        marginRight: theme.spacing(1),
        fontSize: '1rem'
    },
    section: {
        marginBottom: theme.spacing(3),
    },
    form: {
        display: 'flex',
    },
    textField: {
        marginRight: theme.spacing(1),
    }
});

function ItemDescription(props) {
    const { classes, item, handleBidChange, handleBidSubmit, placingBid } = props;
    return (
        <Card
            className={classes.card}
        >
            <CardHeader
                title={<Typography variant="h5" >
                    {item.name}
                </Typography>}
                subheader={<Typography variant="body2" color="textSecondary" >
                    in <em>{item.category.name}</em>
                </Typography>}
            />
            <CardContent>
                <section className={classes.section}>
                    <Typography variant="body2" color="textSecondary" >
                        Description:
                    </Typography>
                    <Typography variant="body1" component="p">
                        {item.description ? item.description : "No description provided"}
                    </Typography>
                </section>


                <section className={classes.section}>
                    <Typography variant="h5" component="span">
                        <>
                            <Money className={classes.icon} />
                            {item.current_bid ? item.current_bid : "No bids"}
                        </>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" >
                        {item.current_bid ? "Make a larger bid to win" : "Be the first one to make a bid!"}
                    </Typography>
                </section>

                <section className={classes.section}>
                    <Typography variant="h5" component="span">
                        <>
                            <Timer className={classes.icon} />
                            <StopWatch date={new Date(item.ending)} />
                        </>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" >
                        {"Place your bid before auction ends"}
                    </Typography>
                </section>

                <section>
                    <form className={classes.form}
                        onSubmit={handleBidSubmit}
                    >
                        <TextField
                            id="outlined-number"
                            placeholder="Your bid"
                            onChange={handleBidChange}
                            type="number"
                            className={classes.textField}
                            variant="outlined"
                        />
                        <Button
                            size="large"
                            color="secondary"
                            variant="contained"
                            type="submit"
                            margin="normal"
                            disabled={placingBid || moment(item.ending).isBefore(new Date())}
                        >
                            Place Bid
                        </Button>
                    </form>
                </section>
            </CardContent>
        </Card>
    );
}


export default withStyles(styles)(ItemDescription);