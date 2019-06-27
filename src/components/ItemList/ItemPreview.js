import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Timer from '@material-ui/icons/Timer';
import Money from '@material-ui/icons/AttachMoney';
import StopWatch from '../Stopwatch';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CardHeader from '@material-ui/core/CardHeader';
import { Link } from 'react-router-dom'

const styles = theme => ({
    card: {
        width: '100%',
        height: '100%'
    },
    media: {
        height: 200,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    description: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(1),
        fontSize: '1rem'
    },
    countdown: {
        marginTop: theme.spacing(2),
        color: fade(theme.palette.primary.main, 1),
    },
    rightFloated: {
        float: 'right'
    },
    link: {
        textDecoration: 'none'
    }
});

function MediaCard(props) {
    const [raised, setRaised] = React.useState(false);
    const { classes, item } = props;

    const onMouseOver = () => setRaised(true);
    const onMouseOut = () => setRaised(false);

    function getUrl(imgs) {
        if (imgs && imgs[0]) return imgs[0].image;
        return 'https://via.placeholder.com/400x300?text=No+Preview+Available';
    };

    return (
        <Link to={`/items/${item.id}/`} className={classes.link}>
            <Card
                className={classes.card}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                raised={raised}
            >
                <CardHeader
                    title={<Typography variant="body1" >
                        {item.name}
                    </Typography>}
                    subheader={<Typography variant="body2" color="textSecondary" >
                        {item.category.name}
                    </Typography>}
                />
                <CardMedia
                    className={classes.media}
                    image={getUrl(item.images)}
                    title={item.name}
                />
                <CardContent>
                    <Typography variant="body2" component="span">
                        <>
                            <Money className={classes.icon} />
                            {item.current_bid ? item.current_bid : "No bids"}
                        </>
                    </Typography>
                    <Typography variant="body2" component="span" className={classes.rightFloated}>
                        <>
                            <Timer className={classes.icon} />
                            <StopWatch date={new Date(item.ending)} />
                        </>
                    </Typography>
                </CardContent>

            </Card>
        </Link>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);