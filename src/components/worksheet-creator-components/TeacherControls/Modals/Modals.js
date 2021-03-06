import * as React from "react";
import Modal from "../../../UI/Modal/Modal";
import NewWorksheet from "../../NewWorksheet/NewWorksheet";
import QuestionWizard from "../../QuestionWizard/QuestionWizard";
import ShareWorksheet from "../../ShareWorksheet/ShareWorksheet";
import DeleteCheck from "../../DeleteCheck/DeleteCheck";

const Modals = ({
  activeWorksheet,
  setActiveWorksheet,
  setTimedMessage,
  activeQuestionAnswers,
  setActiveQuestionAnswers,
  modalIsOpen,
  setModalIsOpen,
  closeModalHandler,
}) => {
  //   const [modalIsOpen, setModalIsOpen] = React.useState({
  //     newWorksheet: false,
  //     deleteCheck: false,
  //     worksheetEditor: false,
  //     questionGenerator: false,
  //     shareWorksheet: false,
  //   });

  //   const closeModalHandler = () => {
  //     setModalIsOpen({
  //       newWorksheet: false,
  //       deleteCheck: false,
  //       worksheetEditor: false,
  //       shareWorksheet: false,
  //       questionGenerator: false,
  //     });
  //   };
  return (
    <>
      {modalIsOpen.deleteCheck ? (
        <Modal closeModalHandler={closeModalHandler} size="small">
          <DeleteCheck
            closeModalHandler={closeModalHandler}
            worksheetId={activeWorksheet.worksheetId}
            setActiveWorksheet={setActiveWorksheet}
            // token={props.token}
            setTimedMessage={setTimedMessage}
          />
        </Modal>
      ) : null}
      {modalIsOpen.worksheetEditor ? (
        <Modal closeModalHandler={closeModalHandler}>
          <NewWorksheet
            closeModalHandler={closeModalHandler}
            activeWorksheet={activeWorksheet}
            // openWorksheetHandler={openWorksheetHandler}
            // token={props.token}
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
            // token={props.token}
            setTimedMessage={setTimedMessage}
            worksheetId={activeWorksheet.worksheetId}
            worksheetName={activeWorksheet.worksheetName}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default Modals;
