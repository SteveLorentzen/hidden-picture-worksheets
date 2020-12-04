import classes from './Background.module.css';
import React from 'react';

const Background = ({ closeModalHandler }) => {
    return (
        <div onClick={closeModalHandler} className={classes.Background}></div>
    )
}

export default Background;