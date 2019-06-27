import React from 'react';
import Countdown from 'react-countdown-now';

// Random component
const Completionist = () => <span>Ended</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>{hours}h:{minutes}m:{seconds}s</span>;
    }
};

export default (props) => <Countdown
    date={props.date}
    renderer={renderer}
/>