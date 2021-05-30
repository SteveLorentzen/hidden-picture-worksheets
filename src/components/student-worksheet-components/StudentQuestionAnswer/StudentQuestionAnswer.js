import React from "react";
import { Box, Input } from "@chakra-ui/core";
import classes from "./StudentQuestionAnswer.module.css";

const StudentQuestionAnswer = ({
  questionAnswerKey,
  questionAnswer,
  changeAnswerHandler,
  isDisabled,
}) => {
  let isInvalid =
    questionAnswer.answerWasAttempted &&
    questionAnswer.answer !== questionAnswer.answerKey &&
    questionAnswer.answer !== "";

  return (
    <>
      <Box className={classes.QuestionAnswer}>
        <p className={classes.Question}>{questionAnswer.question}</p>
        <Input
          isInvalid={isInvalid}
          placeholder="answer"
          className={classes.Answer}
          errorBorderColor="crimson"
          type="text"
          value={questionAnswer.answer}
          onChange={(event) => changeAnswerHandler(event, questionAnswerKey)}
          isDisabled={isDisabled}
        />
      </Box>
      <hr />
    </>
  );
};

export default StudentQuestionAnswer;
