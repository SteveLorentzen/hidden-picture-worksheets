import * as React from "react";
import { Box, Heading, Button } from "@chakra-ui/core";
import classes from "./AssignmentReport.module.css";

const AssignmentReport = ({ assignmentName, scores, closeModalHandler }) => {
  return (
    <Box className={classes.AssignmentReport}>
      <Heading as="h1" className={classes.AssignmentName}>
        {assignmentName}
      </Heading>
      <Box className={classes.StudentProgressBox}>
        {scores.map((score) => {
          let correctCount = 0;

          Object.keys(score.questionAnswers).forEach((key) => {
            if (
              score.questionAnswers[key].answer ===
              score.questionAnswers[key].answerKey
            ) {
              correctCount++;
            }
          });

          return (
            <div key={score.student._id} className={classes.Report}>
              {score.student.name}
              {": "}
              <strong>
                {Math.round((correctCount / score.questionNumber) * 100)}%
              </strong>
            </div>
          );
        })}
      </Box>
      <Button className={classes.DoneButton} onClick={closeModalHandler}>
        Done
      </Button>
    </Box>
  );
};

export default AssignmentReport;
