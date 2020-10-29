import classes from './NewWorksheet.module.css';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
// import { generateBase64FromImage } from '../../util/image'

const NewWorksheet = ({ closeModalHandler, activeWorksheet, openWorksheetHandler }) => {
    const [worksheetName, setWorksheetName] = useState('');
    const [panelNumber, setPanelNumber] = useState(4);
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [panelImageUrl, setPanelImageUrl] = useState('');
    const [mainImage, setMainImage] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (activeWorksheet) {
            setWorksheetName(activeWorksheet.worksheetName);
            setMainImageUrl(activeWorksheet.mainImageUrl);
            setPanelImageUrl(activeWorksheet.panelImageUrl);
        }
    }, [activeWorksheet])

    const editWorksheetHandler = async () => {
        console.log('updating/creating worksheet');
        let url = 'http://localhost:8080/worksheet';
        let method = 'POST';
        if (activeWorksheet) {
            method = 'PUT';
            url = 'http://localhost:8080/worksheet/' + activeWorksheet.worksheetId;
        }
        const formData = new FormData();
        formData.append('worksheetName', worksheetName);
        formData.append('panelNumber', panelNumber);
        formData.append('mainImageUrl', mainImageUrl);
        formData.append('panelImageUrl', panelImageUrl);
        formData.append('mainImage', mainImage[0]);
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(url, {
                method,
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const resData = await res.json();
            console.log(resData);
            closeModalHandler();
            openWorksheetHandler(resData.worksheet._id);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            {!activeWorksheet ? <h1 className={classes.Title}>New Worksheet</h1> :
                <h1>Edit Worksheet</h1>}
            <div className={classes.NewWorksheet}>
                <div className={classes.InputContainer}>
                    <label htmlFor='worksheet-name' >Worksheet Name</label>
                    <input type='text' name='worksheet-name' placeholder="Worksheet Name" value={worksheetName} onChange={(event) => setWorksheetName(event.target.value)} />
                </div>
                {!activeWorksheet ? <div className={classes.InputContainer}>
                    <label htmlFor='panel-number'>Number of Panels</label>
                    <select name='panel-number' value={panelNumber} onChange={(event) => setPanelNumber(+event.target.value)}>
                        <option>4</option>
                        <option>9</option>
                        <option>16</option>
                        <option>25</option>
                        <option>36</option>
                        <option>49</option>
                        <option>64</option>
                        <option>81</option>
                        <option>100</option>
                        <option>121</option>
                    </select>
                </div> :
                    <div>
                        <h3>Panel Number: {activeWorksheet.panelNumber}</h3>
                        <h4>If you want to change the number of panels please create a new worksheet</h4>
                    </div>
                }


                <div className={classes.mainImageContainer}>
                    <div className={classes.InputContainer}>
                        <label htmlFor='main-image-url' >Main Image Url</label>
                        <input type='text' name='main-image-url' placeholder="Main Image Url" value={mainImageUrl} onChange={(event) => setMainImageUrl(event.target.value)} />
                    </div>
                    <h4>Or</h4>
                    <div className={classes.InputContainer}>

                        <input type='file' onChange={(event) => setMainImage(event.target.files)} />
                    </div>
                </div>

                <div className={classes.mainImageContainer}>
                    <div className={classes.InputContainer}>
                        <label htmlFor='panel-image-url' >Panel Image Url</label>
                        <input type='text' name='panel-image-url' placeholder="Panel Image Url" value={panelImageUrl} onChange={(event) => setPanelImageUrl(event.target.value)} />
                    </div>

                </div>

                {!activeWorksheet ? <button onClick={editWorksheetHandler}>Create Worksheet</button> :
                    <button onClick={editWorksheetHandler}>Update Worksheet</button>}
            </div>
        </>
    )
}

export default NewWorksheet;