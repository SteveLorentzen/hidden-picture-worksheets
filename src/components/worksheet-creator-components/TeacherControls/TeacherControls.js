import * as React from "react";
import Modals from "./Modals/Modals";
import TeacherControlButtons from "../TeacherControlButtons/TeacherControlButtons";
import ControlsToggle from "./ControlsToggle/ControlsToggle";

const TeacherControls = ({
  updateWorksheetHandler,
  editorIsOpen,
  setEditorIsOpen,
  activeWorksheet,
  setActiveWorksheet,
  setTimedMessage,
  activeQuestionAnswers,
  setActiveQuestionAnswers,
}) => {
  const [controlsAreOpen, setControlsAreOpen] = React.useState(true);

  const [modalIsOpen, setModalIsOpen] = React.useState({
    newWorksheet: false,
    deleteCheck: false,
    worksheetEditor: false,
    questionGenerator: false,
    shareWorksheet: false,
  });

  const closeModalHandler = () => {
    setModalIsOpen({
      newWorksheet: false,
      deleteCheck: false,
      worksheetEditor: false,
      questionGenerator: false,
      shareWorksheet: false,
    });
  };

  return (
    <>
      <ControlsToggle
        controlsAreOpen={controlsAreOpen}
        setControlsAreOpen={setControlsAreOpen}
      />
      <TeacherControlButtons
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
        updateWorksheetHandler={updateWorksheetHandler}
        editorIsOpen={editorIsOpen}
        setEditorIsOpen={() => setEditorIsOpen(!editorIsOpen)}
        controlsAreOpen={controlsAreOpen}
      />
      <Modals
        activeWorksheet={activeWorksheet}
        setActiveWorksheet={setActiveWorksheet}
        setTimedMessage={setTimedMessage}
        activeQuestionAnswers={activeQuestionAnswers}
        setActiveQuestionAnswers={setActiveQuestionAnswers}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        closeModalHandler={closeModalHandler}
      />
    </>
  );
};

export default TeacherControls;
