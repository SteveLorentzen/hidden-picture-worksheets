import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/core";
import ActiveStudentWorksheet from "../../components/student-worksheet-components/ActiveStudentWorksheet/ActiveStudentWorksheet";
import StudentQuestionAnswer from "../../components/student-worksheet-components/StudentQuestionAnswer/StudentQuestionAnswer";
import StudentHeader from "../../components/common-components/StudentHeader/StudentHeader";

const StudentWorksheet = () => {
  const [worksheet, setWorksheet] = React.useState({});

  const [studentAnswers, setStudentAnswers] = React.useState({});

  const [questionAnswers, setQuestionAnswers] = React.useState({});

  const [showPanels, setShowPanels] = React.useState({});

  const [scoreId, setScoreId] = React.useState("");

  const [worksheetIsLoading, setWorksheetIsLoading] = React.useState(false);

  const { assignmentId } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    console.log("i ran!");
    const updatedShowPanels = {};
    Object.keys(questionAnswers).forEach((key) => {
      if (
        studentAnswers[key].answer.toLowerCase() ===
        questionAnswers[key].answerKey.toLowerCase()
      ) {
        updatedShowPanels[key] = false;
      } else {
        updatedShowPanels[key] = true;
      }
    });
    setShowPanels(updatedShowPanels);
  }, [studentAnswers, questionAnswers]);

  React.useEffect(() => {
    console.log(assignmentId);
    const getWorksheet = async (assignmentId) => {
      setWorksheetIsLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch(
          "http://localhost:8080/student-worksheet/" + assignmentId,
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        const resData = await result.json();
        // const questionAnswers = resData.assignment.worksheet.questionAnswers;
        // const studentAnswers = resData.answers;
        // const updatedQuestionAnswers = {};
        // for (let i = 1; i <= Object.keys(questionAnswers).length; i++) {
        //   updatedQuestionAnswers["question" + i] = {
        //     ...questionAnswers["question" + i],
        //     answer: studentAnswers["question" + i].answer,
        //     answerWasAttempted: studentAnswers["question" + i].answerWasAttempted,
        //   };
        // }
        // console.log(questionAnswers, studentAnswers, updatedQuestionAnswers);
        // const newWorksheet = {
        //   questionAnswers: resData.assignment.worksheet.questionAnswers,
        //   studentAnswers: resData.answers,
        // };
        console.log(resData);
        setStudentAnswers(resData.answers);
        setQuestionAnswers(resData.assignment.worksheet.questionAnswers);
        setScoreId(resData.score._id);
        setWorksheet(resData.assignment.worksheet);
      } catch (err) {
        console.log(err);
      }
      setWorksheetIsLoading(false);
    };
    getWorksheet(assignmentId);
  }, [getAccessTokenSilently, assignmentId]);

  React.useEffect(() => {
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

  let showWorksheet = (
    <ActiveStudentWorksheet
      mainImageUrl={worksheet.mainImageUrl}
      panelImageUrl={worksheet.panelImageUrl}
      showPanels={showPanels}
    >
      {Object.keys(questionAnswers).map((questionAnswerKey, index) => {
        return (
          <StudentQuestionAnswer
            key={questionAnswerKey}
            activeQuestionAnswer={questionAnswers[questionAnswerKey]}
            changeAnswerHandler={changeAnswerHandler}
            activeQuestionAnswerKey={questionAnswerKey}
            studentAnswer={studentAnswers[questionAnswerKey]}
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
    </>
  );
};

export default StudentWorksheet;
