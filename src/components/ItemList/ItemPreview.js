import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Timer from '@material-ui/icons/Timer';
import StopWatch from '../Stopwatch';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    card: {
        width: '100%',
        height: '100%'
    },
    media: {
        height: 300
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
    timerIcon: {
        marginRight: theme.spacing(1),
        fontSize: '1rem'
    },
    countdown: {
        marginTop: theme.spacing(2),
        color: fade(theme.palette.primary.main, 1),
    }
});

function MediaCard(props) {
    const { classes, item, onDetailsClick } = props;

    function getUrl(imgs) {
        if (imgs && imgs[0]) return imgs[0].image;
        return 'https://via.placeholder.com/400x300?text=No+Preview+Available';
    };

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={getUrl(item.images)}
                title={item.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" className={classes.title}>
                    {`${item.name}`}
                </Typography>

                <Typography gutterBottom variant="body1" className={classes.description}>
                    {`${item.description}`}
                </Typography>

                <Typography gutterBottom className={classes.countdown}>
                    <>
                        <Timer className={classes.timerIcon} />
                        <StopWatch date={new Date(item.ending)} />
                    </>
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={onDetailsClick}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);