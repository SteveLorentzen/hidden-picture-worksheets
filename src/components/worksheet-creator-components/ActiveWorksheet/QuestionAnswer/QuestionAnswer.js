import classes from "./QuestionAnswer.module.css";
import React from "react";
import { Box, Input } from "@chakra-ui/core";

const QuestionAnswer = ({
  activeQuestionAnswerKey,
  activeQuestionAnswer,
  changeQuestionAnswerHandler,
  editorIsOpen,
}) => {
  let isInvalid =
    activeQuestionAnswer.answerWasAttempted &&
    activeQuestionAnswer.answer !== activeQuestionAnswer.answerKey &&
    activeQuestionAnswer.answer !== "";

  return (
    <>
      <Box className={classes.QuestionAnswer}>
        {editorIsOpen ? (
          <Input
            placeholder="question"
            className={classes.QuestionInput}
            type="text"
            value={activeQuestionAnswer.question}
            onChange={(event) =>
              changeQuestionAnswerHandler(
                event,
                activeQuestionAnswerKey,
                "question"
              )
            }
          />
        ) : (
          <p className={classes.Question}>{activeQuestionAnswer.question}</p>
        )}

        {editorIsOpen ? (
          <Input
            placeholder="answer key"
            className={classes.Answer}
            type="text"
            value={activeQuestionAnswer.answerKey}
            onChange={(event) =>
              changeQuestionAnswerHandler(
                event,
                activeQuestionAnswerKey,
                "answerKey"
              )
            }
          />
        ) : (
          <Input
            isInvalid={isInvalid}
            placeholder="answer"
            className={classes.Answer}
            errorBorderColor="crimson"
            type="text"
            value={activeQuestionAnswer.answer}
            onChange={(event) =>
              changeQuestionAnswerHandler(
                event,
                activeQuestionAnswerKey,
                "answer"
              )
            }
          />
        )}
      </Box>
      <hr />
    </>
  );
};

export default QuestionAnswer;
