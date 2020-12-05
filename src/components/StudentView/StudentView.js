import React, { useState, useEffect } from "react";
import ActiveStudentWorksheet from "../ActiveStudentWorksheet/ActiveStudentWorksheet";
import StudentHeader from "../StudentHeader/StudentHeader";
import { useAuth0 } from "@auth0/auth0-react";
import AssignedWorksheets from "../AssignedWorksheets/AssignedWorksheets";
import { Spinner, Button } from "@chakra-ui/core";

const StudentView = () => {
  const [assignedWorksheets, setAssignedWorksheets] = useState([]);

  const [activeStudentWorksheet, setActiveStudentWorksheet] = useState(null);

  const [activeQuestionAnswers, setActiveQuestionAnswers] = useState({});

  const [showPanels, setShowPanels] = useState({});

  const [studentAnswers, setStudentAnswers] = useState({});

  const [worksheetIsLoading, setWorksheetIsLoading] = useState(false);

  const [scoreId, setScoreId] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log("i ran!");
    const updatedShowPanels = {};
    Object.keys(activeQuestionAnswers).forEach((key) => {
      if (
        studentAnswers[key].answer.toLowerCase() ===
        activeQuestionAnswers[key].answerKey.toLowerCase()
      ) {
        updatedShowPanels[key] = false;
      } else {
        updatedShowPanels[key] = true;
      }
    });
    setShowPanels(updatedShowPanels);
  }, [studentAnswers, activeQuestionAnswers]);

  useEffect(() => {
    const getAssignedWorksheets = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch(
          "http://localhost:8080/assigned-worksheets",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        const resData = await result.json();
        console.log(resData);
        setAssignedWorksheets(resData.assignedWorksheets);
      } catch (err) {
        console.log(err);
      }
    };
    getAssignedWorksheets();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const updateStudentAnswersOnServerHandler = async () => {
      console.log("updating!");
      if (scoreId) {
        try {
          const token = await getAccessTokenSilently();
          const result = await fetch(
            "http://localhost:8080/update-student-answers",
            {
              method: "put",
              headers: {
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                studentAnswers,
                scoreId,
              }),
            }
          );
          const resData = await result.json();
          console.log(resData);
        } catch (err) {
          console.log(err);
        }
      }
    };
    updateStudentAnswersOnServerHandler();
  }, [studentAnswers, getAccessTokenSilently, scoreId]);

  const openWorksheetHandler = async (assignment) => {
    setWorksheetIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch(
        "http://localhost:8080/student-answers/" + assignment._id,
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      );
      const resData = await result.json();
      console.log(resData);
      setStudentAnswers(resData.answers);
      setActiveQuestionAnswers(assignment.worksheet.questionAnswers);
      setScoreId(resData.score._id);
      setActiveStudentWorksheet(assignment.worksheet);
    } catch (err) {
      console.log(err);
    }
    setWorksheetIsLoading(false);
  };

  const changeAnswerHandler = (event, key) => {
    const updatedStudentAnswers = {
      ...studentAnswers,
      [key]: {
        answerWasAttempted: true,
        answer: event.target.value,
      },
    };
    setStudentAnswers(updatedStudentAnswers);
    console.log(updatedStudentAnswers);
  };

  const closeWorksheetHandler = () => {
    setActiveStudentWorksheet(null);
    setActiveQuestionAnswers({});
    setStudentAnswers({});
    setScoreId("");
  };

  let showActiveStudentWorksheet = <Spinner />;

  if (!worksheetIsLoading && activeStudentWorksheet) {
    showActiveStudentWorksheet = (
      <>
        <ActiveStudentWorksheet
          activeQuestionAnswers={activeQuestionAnswers}
          changeAnswerHandler={changeAnswerHandler}
          mainImageUrl={activeStudentWorksheet.mainImageUrl}
          panelImageUrl={activeStudentWorksheet.panelImageUrl}
          showPanels={showPanels}
          studentAnswers={studentAnswers}
        />
        <Button onClick={closeWorksheetHandler}>Return to Assignments</Button>
      </>
    );
  }

  return (
    <>
      <StudentHeader />
      {activeStudentWorksheet ? (
        showActiveStudentWorksheet
      ) : (
        <AssignedWorksheets
          assignedWorksheets={assignedWorksheets}
          openWorksheetHandler={openWorksheetHandler}
        />
      )}
    </>
  );
};

export default StudentView;