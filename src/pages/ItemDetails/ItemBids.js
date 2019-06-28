import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../../components/AuthProvider';
import axios from 'axios';
import moment from 'moment';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    card: {
        width: '100%',
    }
});

function ItemDescription(props) {
    const { classes, item } = props;
    const { token } = useContext(AuthContext);
    const [loadingBids, setLoadingBids] = useState(false);
    const [bids, setBids] = useState(null);

    useEffect(() => {
        setLoadingBids(true);
        axios
            .get(`/api/auctionables/${item.id}/bids/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setLoadingBids(false);
                setBids(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log('Fetch bids failed', error, error.response);
            });
    }, [item]);

    return (
        <Card
            className={classes.card}
        >
            <CardHeader
                title={<Typography variant="body1" >
                    {"Placed Bids"}
                </Typography>}
            />
            <CardContent>
                {
                    bids && bids.length > 0 ?
                        (<>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bids.map(bid => (
                                        <TableRow key={bid.id}>
                                            <TableCell component="th" scope="bid">
                                                {bid.user.username}
                                            </TableCell>
                                            <TableCell align="right">{bid.amount}</TableCell>
                                            <TableCell align="right">{moment(bid.added).fromNow()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>) : <Typography variant="body2" color="textSecondary" >
                            <em>{"No bids found"}</em>
                        </Typography>
                }

            </CardContent>
        </Card>
    );
}


export default withStyles(styles)(ItemDescription);