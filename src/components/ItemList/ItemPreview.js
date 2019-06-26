import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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