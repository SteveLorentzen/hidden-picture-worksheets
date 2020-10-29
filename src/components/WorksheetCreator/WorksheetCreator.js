import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal/Modal';
import NewWorksheet from '../NewWorksheet/NewWorksheet';
import ActiveWorksheet from '../ActiveWorksheet/ActiveWorksheet';
import DeleteCheck from '../DeleteCheck/DeleteCheck';
import QuestionGenerator from '../QuestionGenerator/QuestionGenerator'
import { useAuth0 } from '@auth0/auth0-react'

const WorksheetCreator = (props) => {
    const [worksheetNames, setWorksheetNames] = useState([]);

    const [newWorksheetModalIsOpen, setNewWorksheetModalIsOpen] = useState(false);

    const [editorIsOpen, setEditorIsOpen] = useState(false);

    const [activeWorksheet, setActiveWorksheet] = useState(null);

    const [activeQuestionAnswers, setActiveQuestionAnswers] = useState({});

    const [showPanels, setShowPanels] = useState({});

    const [deleteCheckModalIsOpen, setDeleteCheckModalIsOpen] = useState(false);

    const [worksheetEditorModalIsOpen, setWorksheetEditorModalIsOpen] = useState(false);

    const [questionGeneratorModalIsOpen, setQuestionGeneratorModalIsOpen] = useState(false);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchWorksheets = async () => {
            try {
                const token = await getAccessTokenSilently();

                console.log(token);

                const result = await fetch('http://localhost:8080/worksheets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const resData = await result.json();
                console.log(resData);
                setWorksheetNames(resData.worksheetNames);
            } catch (err) {
                console.log(err);
            }
        }
        fetchWorksheets();
    }, [newWorksheetModalIsOpen, worksheetEditorModalIsOpen, deleteCheckModalIsOpen, getAccessTokenSilently])

    useEffect(() => {
        const updatedShowPanels = {};
        Object.keys(activeQuestionAnswers).forEach(key => {
            if (activeQuestionAnswers[key].answer === activeQuestionAnswers[key].answerKey) {
                updatedShowPanels[key] = false;
            } else {
                updatedShowPanels[key] = true;
            }
        });
        setShowPanels(updatedShowPanels);
    }, [activeQuestionAnswers]);

    const openNewWorksheetModalHandler = () => {
        setNewWorksheetModalIsOpen(true);
    }

    const closeModalHandler = () => {
        setNewWorksheetModalIsOpen(false);
        setDeleteCheckModalIsOpen(false);
        setWorksheetEditorModalIsOpen(false);
        setQuestionGeneratorModalIsOpen(false)
    }

    const openWorksheetHandler = async (id) => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token);
            const result = await fetch('http://localhost:8080/worksheet/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const resData = await result.json();
            console.log(resData.worksheet.mainImage);
            let mainImageUrl;
            if (resData.worksheet.mainImage) {
                mainImageUrl = 'http://localhost:8080/' + resData.worksheet.mainImage
            } else {
                mainImageUrl = resData.worksheet.mainImageUrl;
            }
            setActiveWorksheet({
                worksheetName: resData.worksheet.worksheetName,
                mainImageUrl,
                panelImageUrl: resData.worksheet.panelImageUrl,
                worksheetId: resData.worksheet._id,
                createdByUserId: '1',
                panelNumber: resData.worksheet.panelNumber,
            });
            console.log(resData);
            setActiveQuestionAnswers(resData.worksheet.questionAnswers);
        } catch (err) {
            console.log(err);
        }
    }

    const changeQuestionAnswerHandler = (event, key, type) => {
        const updatedQuestionAnswers = {
            ...activeQuestionAnswers,
            [key]: {
                ...activeQuestionAnswers[key],
                [type]: event.target.value,
            }
        }
        setActiveQuestionAnswers(updatedQuestionAnswers);
    }

    const updateWorksheetHandler = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token);
            const res = await fetch('http://localhost:8080/update-worksheet', {
                method: 'PATCH',
                body: JSON.stringify({
                    worksheetId: activeWorksheet.worksheetId,
                    questionAnswers: activeQuestionAnswers,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            const resData = await res.json();
            console.log(resData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={openNewWorksheetModalHandler}>Create New Worksheet</button>

            {activeWorksheet ?
                <div>
                    <button onClick={() => setEditorIsOpen(!editorIsOpen)}>Open Editor</button>
                    <button name='generate-questions' onClick={() => setQuestionGeneratorModalIsOpen(true)}>Question Generator</button>
                </div> : null}
            <div>
                <ul>
                    {worksheetNames.map(worksheet => {
                        return <div onClick={() => openWorksheetHandler(worksheet._id)} key={worksheet._id}>{worksheet.worksheetName}</div>
                    })}
                </ul>
            </div>
            { activeWorksheet ?
                <>
                    <ActiveWorksheet
                        activeQuestionAnswers={activeQuestionAnswers}
                        changeQuestionAnswerHandler={changeQuestionAnswerHandler}
                        editorIsOpen={editorIsOpen}
                        showPanels={showPanels}
                        mainImageUrl={activeWorksheet.mainImageUrl}
                        panelImageUrl={activeWorksheet.panelImageUrl} />
                    <button onClick={updateWorksheetHandler}>Save Changes</button>
                    <button onClick={() => setDeleteCheckModalIsOpen(true)}>Delete Current Worksheet</button>
                    <button onClick={() => setWorksheetEditorModalIsOpen(true)}>Edit Worksheet</button>

                </>
                : null}
            {newWorksheetModalIsOpen ?
                <Modal closeModalHandler={closeModalHandler}>
                    <NewWorksheet closeModalHandler={closeModalHandler} token={props.token} />
                </Modal> : null}
            {deleteCheckModalIsOpen ?
                <Modal closeModalHandler={closeModalHandler}>
                    <DeleteCheck closeModalHandler={closeModalHandler} worksheetId={activeWorksheet.worksheetId} setActiveWorksheet={setActiveWorksheet} token={props.token} />
                </Modal> : null}
            {worksheetEditorModalIsOpen ?
                <Modal closeModalHandler={closeModalHandler}>
                    <NewWorksheet closeModalHandler={closeModalHandler} activeWorksheet={activeWorksheet} openWorksheetHandler={openWorksheetHandler} token={props.token} />
                </Modal> : null}
            {questionGeneratorModalIsOpen ?
                <Modal closeModalHandler={closeModalHandler}>
                    <QuestionGenerator closeModalHandler={closeModalHandler} panelNumber={activeWorksheet.panelNumber} activeQuestionAnswers={activeQuestionAnswers} setActiveQuestionAnswers={setActiveQuestionAnswers} />
                </Modal> : null}
        </div>
    )
}

export default WorksheetCreator;