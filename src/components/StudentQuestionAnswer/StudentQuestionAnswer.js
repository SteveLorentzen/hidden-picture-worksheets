import React from "react";
import { Box, Input } from "@chakra-ui/core";
import classes from "./StudentQuestionAnswer.module.css";

const StudentQuestionAnswer = ({
  activeQuestionAnswerKey,
  activeQuestionAnswer,
  changeAnswerHandler,
  studentAnswer,
}) => {
  let isInvalid =
    studentAnswer.answerWasAttempted &&
    studentAnswer.answer !== activeQuestionAnswer.answerKey &&
    studentAnswer.answer !== "";

  return (
    <>
      <Box className={classes.QuestionAnswer}>
        <p className={classes.Question}>{activeQuestionAnswer.question}</p>
        <Input
          isInvalid={isInvalid}
          placeholder="answer"
          className={classes.Answer}
          errorBorderColor="crimson"
          type="text"
          value={studentAnswer.answer}
          onChange={(event) =>
            changeAnswerHandler(event, activeQuestionAnswerKey)
          }
        />
      </Box>
      <hr />
    </>
  );
};

export default StudentQuestionAnswer;
