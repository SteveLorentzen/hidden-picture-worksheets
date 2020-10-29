import classes from './DeleteCheck.module.css';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const DeleteCheck = ({ closeModalHandler, worksheetId, setActiveWorksheet }) => {

    const { getAccessTokenSilently } = useAuth0();

    const deleteWorksheetHandler = async (worksheetId) => {
        try {
            const token = await getAccessTokenSilently();
            console.log(worksheetId);
            const res = await fetch('http://localhost:8080/worksheet/' + worksheetId, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const resData = await res.json();
            console.log(resData);
            closeModalHandler();
            setActiveWorksheet(null);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div>
                <h2>Are you sure you want to delete this worksheet?</h2>
            </div>
            <div className={classes.ConfirmOrCancel}>
                <div className={classes.Cancel}><h1 onClick={closeModalHandler}>Cancel</h1></div>
                <div className={classes.Confirm}><h1 onClick={() => deleteWorksheetHandler(worksheetId)}>Confirm Delete</h1></div>
            </div>
        </>
    )
}

export default DeleteCheck;