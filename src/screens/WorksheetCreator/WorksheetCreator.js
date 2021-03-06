import React, { useState, useEffect } from "react";
import ActiveWorksheet from "../../components/worksheet-creator-components/ActiveWorksheet/ActiveWorksheet";
import Header from "../../components/common-components/Header/Header";
import SpinnerCustom from "../../components/UI/SpinnerCustom/SpinnerCustom";
import TimedMessage from "../../components/worksheet-creator-components/TimedMessage/TimedMessage";
import WelcomeMessage from "../../components/worksheet-creator-components/WelcomeMessage/WelcomeMessage";
import TeacherControls from "../../components/worksheet-creator-components/TeacherControls/TeacherControls";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";
import AcceptSharedWorksheet from "../../components/worksheet-creator-components/AcceptSharedWorksheet/AcceptSharedWorksheet";

const WorksheetCreator = (props) => {
  const [activeWorksheet, setActiveWorksheet] = useState(null);

  const [activeQuestionAnswers, setActiveQuestionAnswers] = useState({});

  const [showPanels, setShowPanels] = useState({});

  const [worksheetIsLoading, setWorksheetIsLoading] = useState(false);

  const [editorIsOpen, setEditorIsOpen] = useState(false);

  const [acceptWorksheetModalIsOpen, setAcceptWorksheetModalIsOpen] = useState(
    false
  );

  const [sharedWorksheetMessage, setSharedWorksheetMessage] = useState("");

  const [timedMessage, setTimedMessage] = useState({
    showing: true,
    message: "",
  });

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
      worksheetId = localStorage.getItem("worksheetId");
      localStorage.removeItem("worksheetId");
    } else {
      return;
    }
    const addSharedWorksheetToUser = async () => {
      try {
        const result = await axios.post("/accept-shared-worksheet", {
          data: { worksheetId },
        });
        console.log(result);
        setSharedWorksheetMessage(result.data.message);
        setAcceptWorksheetModalIsOpen(true);
      } catch (err) {
        console.log(err);
      }
    };
    if (worksheetId) {
      addSharedWorksheetToUser();
    }
  }, []);

  const openWorksheetHandler = async (id) => {
    setWorksheetIsLoading(true);
    try {
      const result = await axios.get("/worksheet/" + id);
      console.log(result);
      setActiveWorksheet({
        worksheetName: result.data.worksheet.worksheetName,
        mainImageUrl: result.data.worksheet.mainImageUrl,
        panelImageUrl: result.data.worksheet.panelImageUrl,
        worksheetId: result.data.worksheet._id,
        createdByUserId: result.data.worksheet.createdBy,
        panelNumber: result.data.worksheet.panelNumber,
      });
      setActiveQuestionAnswers(result.data.worksheet.questionAnswers);
      setWorksheetIsLoading(false);
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
      const result = await axios.patch("/update-worksheet", {
        data: {
          worksheetId: activeWorksheet.worksheetId,
          questionAnswers: activeQuestionAnswers,
        },
      });
      setTimedMessage({ showing: true, message: result.data.message });
      setTimeout(() => setTimedMessage({ showing: false, message: "" }), 1500);
      console.log(result);
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
        <TeacherControls
          updateWorksheetHandler={updateWorksheetHandler}
          editorIsOpen={editorIsOpen}
          setEditorIsOpen={() => setEditorIsOpen(!editorIsOpen)}
          activeWorksheet={activeWorksheet}
          setActiveWorksheet={setActiveWorksheet}
          setTimedMessage={setTimedMessage}
          activeQuestionAnswers={activeQuestionAnswers}
          setActiveQuestionAnswers={setActiveQuestionAnswers}
        />

        <ActiveWorksheet
          activeQuestionAnswers={activeQuestionAnswers}
          changeQuestionAnswerHandler={changeQuestionAnswerHandler}
          editorIsOpen={editorIsOpen}
          showPanels={showPanels}
          mainImageUrl={activeWorksheet.mainImageUrl}
          panelImageUrl={activeWorksheet.panelImageUrl}
          worksheetName={activeWorksheet.worksheetName}
        ></ActiveWorksheet>
      </>
    );
  }

  return (
    <>
      <Header
        activeWorksheetBool={activeWorksheet !== null}
        // isTeacher={isTeacher}
        isHeaderForWorksheetsPage
        openWorksheetHandler={openWorksheetHandler}
        setTimedMessage={setTimedMessage}
        activeWorksheet={activeWorksheet}
        setActiveWorksheet={setActiveWorksheet}
      />

      {activeWorksheet ? null : (
        <WelcomeMessage openWorksheetHandler={openWorksheetHandler} />
      )}

      {showActiveWorksheet}

      <TimedMessage timedMessage={timedMessage} />

      {acceptWorksheetModalIsOpen ? (
        <Modal size="small">
          <AcceptSharedWorksheet
            sharedWorksheetMessage={sharedWorksheetMessage}
            setAcceptWorksheetModalIsOpen={setAcceptWorksheetModalIsOpen}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default WorksheetCreator;
