import React from 'react';
import classes from './Modal.module.css';
import Background from '../Background/Background'

const Modal = (props) => {
    return (
        <>
            <div className={classes.Modal}>
                {props.children}
            </div>
            <Background closeModalHandler={props.closeModalHandler}></Background>
        </>
    )
}

export default Modal;