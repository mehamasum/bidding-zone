import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        height: '100%',
        minHeight: 400
    },
    media: {
        height: '100%',
        width: '100%',
    },
}));


export default function ItemImages(props) {
    const { item } = props;
    const classes = useStyles();
    return (
        <Card
            className={classes.card}
        >
            {item.images.length > 0 ?
                <Carousel>
                    {item.images.map(img => <div key={img.id}>
                        <img src={img.image} alt={item.name} />
                    </div>)}
                </Carousel> : <CardMedia
                    className={classes.media}
                    image={"https://via.placeholder.com/400x300?text=No+Images+Provided"}
                    title={item.name}
                />
            }
        </Card>
    )
}