import classes from './Background.module.css';
import React from 'react';

const Background = (props) => {
    return (
        <div onClick={props.closeModalHandler} className={classes.Background}></div>
    )
}

export default Background;