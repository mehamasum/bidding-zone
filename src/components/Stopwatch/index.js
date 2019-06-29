import React from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>Ended</span>;
    } else {
        if (days) return <span>{days}d:{hours}h:{minutes}m:{seconds}s</span>;
        return <span>{hours}h:{minutes}m:{seconds}s</span>;
    }
};

export default (props) => <Countdown date={props.date} renderer={renderer} />