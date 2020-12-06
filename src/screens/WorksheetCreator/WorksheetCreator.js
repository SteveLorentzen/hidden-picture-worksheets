import React, { useState, useEffect } from "react";
import classes from "./WorksheetCreator.module.css";
import Modal from "../../components/UI/Modal/Modal";
import NewWorksheet from "../../components/NewWorksheet/NewWorksheet";
import ActiveWorksheet from "../../components/ActiveWorksheet/ActiveWorksheet";
import DeleteCheck from "../../components/DeleteCheck/DeleteCheck";
import QuestionWizard from "../../components/QuestionGenerator/QuestionWizard";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/core";
import Header from "../../components/Header/Header";
import SpinnerCustom from "../../components/UI/SpinnerCustom/SpinnerCustom";
import TeacherControls from "../../components/TeacherControls/TeacherControls";
import ShareWorksheet from "../../components/ShareWorksheet/ShareWorksheet";

import ControlsToggle from "../../components/ControlsToggle/ControlsToggle";

const WorksheetCreator = (props) => {
  const [worksheetNames, setWorksheetNames] = useState([]);

  const [activeWorksheet, setActiveWorksheet] = useState(null);

  const [activeQuestionAnswers, setActiveQuestionAnswers] = useState({});

  const [showPanels, setShowPanels] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState({
    newWorksheet: false,
    deleteCheck: false,
    worksheetEditor: false,
    questionGenerator: false,
    shareWorksheet: false,
  });

  const [worksheetIsLoading, setWorksheetIsLoading] = useState(false);

  const [controlsAreOpen, setControlsAreOpen] = useState(true);

  const [editorIsOpen, setEditorIsOpen] = useState(false);

  const [timedMessage, setTimedMessage] = useState({
    showing: true,
    message: "",
  });

  const [worksheetMenuIsLoading, setWorksheetMenuIsLoading] = useState(false);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  //   const [classroomCode, setClassroomCode] = useState("");

  const { getAccessTokenSilently, user } = useAuth0();

  let isTeacher = false;
  if (user) {
    isTeacher = user["https://hiddenpicturetest.com/roles"].includes("teacher");
  }

  useEffect(() => {
    const updatedShowPanels = {};
    Object.keys(activeQuestionAnswers).forEach((key) => {
      if (
        activeQuestionAnswers[key].answer.toLowerCase() ===
        activeQuestionAnswers[key].answerKey.toLowerCase()
      ) {
        updatedShowPanels[key] = false;
      } else {
        updatedShowPanels[key] = true;
      }
    });
    setShowPanels(updatedShowPanels);
  }, [activeQuestionAnswers]);

  useEffect(() => {
    let worksheetId = null;
    if (localStorage.getItem("worksheetId")) {
      console.log("yeah boyee");
      worksheetId = localStorage.getItem("worksheetId");
      localStorage.removeItem("worksheetId");
    } else {
      return;
    }
    const addSharedWorksheetToUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch(
          "http://localhost:8080/accept-shared-worksheet",
          {
            method: "post",
            headers: {
              Authorization: "bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              worksheetId,
            }),
          }
        );
        const resData = await result.json();
        console.log(resData);
        setTimedMessage({
          showing: true,
          message: resData.message,
        });
        setTimeout(() => {
          setTimedMessage({ showing: false, message: "" });
        }, 4500);
      } catch (err) {
        console.log(err);
      }
    };
    if (worksheetId) {
      addSharedWorksheetToUser();
    }
  }, [getAccessTokenSilently]);

  const setWorksheets = async () => {
    setWorksheetMenuIsLoading(true);
    const fetchWorksheets = async () => {
      try {
        const token = await getAccessTokenSilently();

        const result = await fetch("http://localhost:8080/worksheets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resData = await result.json();
        console.log(resData);
        setWorksheetNames(resData.worksheetNames);
        setWorksheetMenuIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorksheets();
  };

  const closeModalHandler = () => {
    setModalIsOpen({
      newWorksheet: false,
      deleteCheck: false,
      worksheetEditor: false,
      questionGenerator: false,
    });
  };

  const openWorksheetHandler = async (id) => {
    setWorksheetIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch("http://localhost:8080/worksheet/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await result.json();
      let mainImageUrl;
      if (resData.worksheet.mainImage) {
        mainImageUrl = "http://localhost:8080/" + resData.worksheet.mainImage;
      } else {
        mainImageUrl = resData.worksheet.mainImageUrl;
      }
      setActiveWorksheet({
        worksheetName: resData.worksheet.worksheetName,
        mainImageUrl,
        panelImageUrl: resData.worksheet.panelImageUrl,
        worksheetId: resData.worksheet._id,
        createdByUserId: "1",
        panelNumber: resData.worksheet.panelNumber,
      });
      console.log(resData);
      setActiveQuestionAnswers(resData.worksheet.questionAnswers);
      setWorksheetIsLoading(false);
      setDrawerIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const changeQuestionAnswerHandler = (event, key, type) => {
    let answerWasAttempted = false;
    if (
      type === "answer" ||
      activeQuestionAnswers[key].answerWasAttempted === true
    ) {
      answerWasAttempted = true;
    }

    const updatedQuestionAnswers = {
      ...activeQuestionAnswers,
      [key]: {
        ...activeQuestionAnswers[key],
        answerWasAttempted,
        [type]: event.target.value,
      },
    };
    console.log(activeQuestionAnswers[key].answerWasAttempted);
    setActiveQuestionAnswers(updatedQuestionAnswers);
  };

  const updateWorksheetHandler = async () => {
    setTimedMessage({ message: "Saving...", showing: true });
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:8080/update-worksheet", {
        method: "PATCH",
        body: JSON.stringify({
          worksheetId: activeWorksheet.worksheetId,
          questionAnswers: activeQuestionAnswers,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();
      setTimedMessage({ showing: true, message: "Worksheet saved :)" });
      setTimeout(() => setTimedMessage({ showing: false, message: "" }), 1500);
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

  let showActiveWorksheet = null;

  if (worksheetIsLoading) {
    showActiveWorksheet = <SpinnerCustom />;
  } else if (activeWorksheet && !worksheetIsLoading) {
    showActiveWorksheet = (
      <>
        <ControlsToggle
          controlsAreOpen={controlsAreOpen}
          setControlsAreOpen={setControlsAreOpen}
        />
        <div className={classes.ButtonBox}>
          <TeacherControls
            updateWorksheetHandler={updateWorksheetHandler}
            deleteWorksheetModal={() =>
              setModalIsOpen(() => ({ ...modalIsOpen, deleteCheck: true }))
            }
            editWorksheetModal={() =>
              setModalIsOpen({ ...modalIsOpen, worksheetEditor: true })
            }
            openQuestionGeneratorModal={() =>
              setModalIsOpen({ ...modalIsOpen, questionGenerator: true })
            }
            openNewWorksheetModal={() =>
              setModalIsOpen({ ...modalIsOpen, newWorksheet: true })
            }
            openShareWorksheetModal={() =>
              setModalIsOpen({ ...modalIsOpen, shareWorksheet: true })
            }
            editorIsOpen={editorIsOpen}
            setEditorIsOpen={() => setEditorIsOpen(!editorIsOpen)}
            controlsAreOpen={controlsAreOpen}
          />
        </div>
        <ActiveWorksheet
          activeQuestionAnswers={activeQuestionAnswers}
          changeQuestionAnswerHandler={changeQuestionAnswerHandler}
          editorIsOpen={editorIsOpen}
          showPanels={showPanels}
          mainImageUrl={activeWorksheet.mainImageUrl}
          panelImageUrl={activeWorksheet.panelImageUrl}
          // updateWorksheetHandler={updateWorksheetHandler}
        ></ActiveWorksheet>
      </>
    );
  }

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
    setWorksheets();
  };

  return (
    <>
      <Header
        openNewWorksheetModal={() =>
          setModalIsOpen({ ...modalIsOpen, newWorksheet: true })
        }
        openQuestionGeneratorModal={() =>
          setModalIsOpen({ ...modalIsOpen, questionGenerator: true })
        }
        activeWorksheetBool={activeWorksheet !== null}
        isTeacher={isTeacher}
        drawerIsOpen={drawerIsOpen}
        setDrawerIsOpen={openDrawerHandler}
        setDrawerIsClosed={() => setDrawerIsOpen(false)}
        isHeaderForWorksheetsPage
      >
        <div>
          {worksheetMenuIsLoading ? (
            <Spinner />
          ) : (
            worksheetNames.map((worksheet) => {
              return (
                <div
                  key={worksheet._id}
                  className={classes.WorksheetName}
                  onClick={() => openWorksheetHandler(worksheet._id)}
                >
                  <h5>{worksheet.worksheetName}</h5>
                </div>
              );
            })
          )}
        </div>
      </Header>

      {showActiveWorksheet}

      {modalIsOpen.newWorksheet ? (
        <Modal closeModalHandler={closeModalHandler}>
          <NewWorksheet
            closeModalHandler={closeModalHandler}
            token={props.token}
            setTimedMessage={setTimedMessage}
          />
        </Modal>
      ) : null}
      {modalIsOpen.deleteCheck ? (
        <Modal closeModalHandler={closeModalHandler} size="small">
          <DeleteCheck
            closeModalHandler={closeModalHandler}
            worksheetId={activeWorksheet.worksheetId}
            setActiveWorksheet={setActiveWorksheet}
            token={props.token}
            setTimedMessage={setTimedMessage}
          />
        </Modal>
      ) : null}
      {modalIsOpen.worksheetEditor ? (
        <Modal closeModalHandler={closeModalHandler}>
          <NewWorksheet
            closeModalHandler={closeModalHandler}
            activeWorksheet={activeWorksheet}
            openWorksheetHandler={openWorksheetHandler}
            token={props.token}
            setTimedMessage={setTimedMessage}
          />
        </Modal>
      ) : null}
      {modalIsOpen.questionGenerator ? (
        <Modal closeModalHandler={closeModalHandler}>
          <QuestionWizard
            setTimedMessage={setTimedMessage}
            closeModalHandler={closeModalHandler}
            panelNumber={activeWorksheet.panelNumber}
            activeQuestionAnswers={activeQuestionAnswers}
            setActiveQuestionAnswers={setActiveQuestionAnswers}
          />
        </Modal>
      ) : null}
      {modalIsOpen.shareWorksheet ? (
        <Modal closeModalHandler={closeModalHandler}>
          <ShareWorksheet
            closeModalHandler={closeModalHandler}
            token={props.token}
            setTimedMessage={setTimedMessage}
            worksheetId={activeWorksheet.worksheetId}
            worksheetName={activeWorksheet.worksheetName}
          />
        </Modal>
      ) : null}
      {timedMessage.showing ? (
        <div
          className={
            timedMessage.err ? classes.TimedMessage : classes.TimedErrMessage
          }
        >
          {timedMessage.message}
        </div>
      ) : null}
    </>
  );
};

export default WorksheetCreator;
