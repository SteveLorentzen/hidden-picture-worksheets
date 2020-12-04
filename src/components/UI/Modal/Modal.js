import React from 'react';
import classes from './Modal.module.css';
import Background from '../Background/Background'

const Modal = ({ children, closeModalHandler, size }) => {
    let modalClasses = [classes.Modal];

    if (size === 'small') {
        modalClasses = [classes.ModalSmall];
    }

    return (
        <>
            <div className={modalClasses.join(' ')}>
                {children}
            </div>
            <Background closeModalHandler={closeModalHandler}></Background>
        </>
    )
}

export default Modal;