import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spinner, Box, Heading, Button } from "@chakra-ui/core";
import ActiveStudentWorksheet from "../../components/student-worksheet-components/ActiveStudentWorksheet/ActiveStudentWorksheet";
import StudentQuestionAnswer from "../../components/student-worksheet-components/StudentQuestionAnswer/StudentQuestionAnswer";
import StudentHeader from "../../components/common-components/StudentHeader/StudentHeader";
import axios from "axios";
import classes from "./StudentWorksheet.module.css";
import Modal from "../../components/UI/Modal/Modal";
import SuccessMessage from "./SuccessMessage/SuccessMessage";

const StudentWorksheet = () => {
  const [worksheet, setWorksheet] = React.useState({});

  const [questionAnswers, setQuestionAnswers] = React.useState({});

  const [messageTimeout, setMessageTimeout] = React.useState(null);

  const [saveTimeout, setSaveTimeout] = React.useState(null);

  const [errorTimeout, setErrorTimeout] = React.useState(null);

  const [scoreId, setScoreId] = React.useState("");

  const [worksheetIsLoading, setWorksheetIsLoading] = React.useState(false);

  const [updatingMessage, setUpdatingMessage] = React.useState({
    message: "",
    err: false,
  });

  const [worksheetIsComplete, setWorksheetIsComplete] = React.useState(false);

  const [successModalIsOpen, setSuccessModalIsOpen] = React.useState(false);

  const [isLateModalIsOpen, setIsLateModalIsOpen] = React.useState(false);

  const { assignmentId } = useParams();

  const history = useHistory();

  React.useEffect(() => {
    console.log("effect");
    let correctAnswerCount = 0;
    for (let i = 1; i <= Object.keys(questionAnswers).length; i++) {
      if (
        questionAnswers["question" + i].answer ===
        questionAnswers["question" + i].answerKey
      ) {
        correctAnswerCount++;
      } else {
        setWorksheetIsComplete(false);
        setSuccessModalIsOpen(false);
        return;
      }
    }
    if (
      questionAnswers["question1"] &&
      correctAnswerCount === Object.keys(questionAnswers).length
    ) {
      setWorksheetIsComplete(true);
      setSuccessModalIsOpen(true);
    }
  }, [questionAnswers]);

  // React.useEffect(() => {
  //   console.log("i ran!");
  //   const updatedShowPanels = {};
  //   Object.keys(questionAnswers).forEach((key) => {
  //     if (
  //       studentAnswers[key].answer.toLowerCase() ===
  //       questionAnswers[key].answerKey.toLowerCase()
  //     ) {
  //       updatedShowPanels[key] = false;
  //     } else {
  //       updatedShowPanels[key] = true;
  //     }
  //   });
  //   setShowPanels(updatedShowPanels);
  // }, [studentAnswers, questionAnswers]);

  React.useEffect(() => {
    console.log(assignmentId);

    const getWorksheet = async (assignmentId) => {
      setWorksheetIsLoading(true);
      try {
        const result = await axios.get("/student-worksheet/" + assignmentId);

        console.log(result);
        setQuestionAnswers(result.data.score.questionAnswers);
        setScoreId(result.data.score._id);
        setWorksheet(result.data.assignment.worksheet);
      } catch (err) {
        console.log(err);
      }
      setWorksheetIsLoading(false);
    };
    getWorksheet(assignmentId);
  }, [assignmentId]);

  const updateStudentAnswersOnServerHandler = async (
    updatedQuestionAnswers
  ) => {
    console.log("updating!");
    setUpdatingMessage({ message: "Saving answers...", isError: false });
    if (scoreId) {
      try {
        const result = await axios.put("/update-student-answers", {
          data: {
            questionAnswers: updatedQuestionAnswers,
            scoreId,
          },
        });
        console.log(result);
        if (result.data.isLate) {
          setIsLateModalIsOpen(true);
        }
        setUpdatingMessage({ message: result.data.message, isError: false });

        setMessageTimeout(
          setTimeout(() => {
            setUpdatingMessage({ message: "", isError: false });
          }, 2000)
        );
      } catch (err) {
        console.log(err);
        setUpdatingMessage({
          message: err.message + ": answers not saved :(  Try again later",
          isError: true,
        });
        setErrorTimeout(
          setTimeout(() => {
            setUpdatingMessage({ message: "", isError: true });
          }, 4000)
        );
      }
    }
  };

  const changeAnswerHandler = (event, key) => {
    //cleanup from any previous timeouts that have yet to execute
    clearTimeout(saveTimeout);
    clearTimeout(messageTimeout);
    clearTimeout(errorTimeout);

    const updatedQuestionAnswers = {
      ...questionAnswers,
      [key]: {
        ...questionAnswers[key],
        answerWasAttempted: true,
        answer: event.target.value,
      },
    };
    if (
      updatedQuestionAnswers[key].answer.toLowerCase() ===
      questionAnswers[key].answerKey.toLowerCase()
    ) {
      updatedQuestionAnswers[key].showPanel = false;
    } else {
      updatedQuestionAnswers[key].showPanel = true;
    }

    setQuestionAnswers(updatedQuestionAnswers);
    setSaveTimeout(
      setTimeout(() => {
        updateStudentAnswersOnServerHandler(updatedQuestionAnswers);
      }, 1000)
    );
  };

  const returnHandler = () => {
    history.push("/");
  };

  let showWorksheet = (
    <ActiveStudentWorksheet
      mainImageUrl={worksheet.mainImageUrl}
      panelImageUrl={worksheet.panelImageUrl}
      questionAnswers={questionAnswers}
    >
      {Object.keys(questionAnswers).map((questionAnswerKey, index) => {
        return (
          <StudentQuestionAnswer
            key={questionAnswerKey}
            questionAnswer={questionAnswers[questionAnswerKey]}
            changeAnswerHandler={changeAnswerHandler}
            questionAnswerKey={questionAnswerKey}
            isDisabled={worksheetIsComplete}
          />
        );
      })}
    </ActiveStudentWorksheet>
  );

  if (worksheetIsLoading) {
    showWorksheet = (
      <Box display="flex" justifyContent="center" marginTop="30px">
        <Spinner size="xl" />;
      </Box>
    );
  }

  return (
    <>
      <StudentHeader isHeaderForStudentWorksheet />
      {showWorksheet}
      {updatingMessage.message ? (
        <div
          className={
            updatingMessage.isError
              ? [classes.Message, classes.ErrorMessage].join(" ")
              : classes.Message
          }
        >
          {updatingMessage.message}
        </div>
      ) : null}
      {worksheetIsComplete ? (
        <div className={classes.CompleteMessage}>
          This <strong className={classes.Accent}>worksheet</strong> is
          complete. Well done!
        </div>
      ) : null}
      {successModalIsOpen ? (
        <Modal
          closeModalHandler={() => setSuccessModalIsOpen(false)}
          size="small"
        >
          <SuccessMessage
            closeModalHandler={() => setSuccessModalIsOpen(false)}
          />
        </Modal>
      ) : null}
      {isLateModalIsOpen ? (
        <Modal closeModalHandler={returnHandler} size="small">
          <Heading as="h2">
            Sorry, this worksheet is no longer available
          </Heading>
          <Button onClick={returnHandler}>Return to Assignments</Button>
        </Modal>
      ) : null}
    </>
  );
};

export default StudentWorksheet;
