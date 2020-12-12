import React, { useState } from "react";
import classes from "./Assignment.module.css";
import { Box, Heading, Button } from "@chakra-ui/core";
import { format } from "date-fns";

const Assignment = ({
  assignmentName,
  worksheetName,
  createdAt,
  dueDate,
  classroomName,
  scores,
  deleteAssignmentHandler,
}) => {
  const [studentDataIsShowing, setStudentDataIsShowing] = useState(false);

  const openAssignmentHandler = () => {
    setStudentDataIsShowing(!studentDataIsShowing);
  };

  return (
    <Box className={classes.AssignmentOuterBox} onClick={openAssignmentHandler}>
      <Box className={classes.AssignmentBox}>
        <Heading as="h1" size="lg" className={classes.AssignmentName}>
          {assignmentName}
        </Heading>
        <Box className={classes.WorksheetName}>
          <Heading as="h2" size="md">
            Worksheet: {worksheetName}
          </Heading>
          <Heading as="h2" size="md">
            Classroom: {classroomName} ({scores.length}{" "}
            {scores.length === 1 ? "student" : "students"})
          </Heading>
        </Box>

        <Box className={classes.DateBox}>
          <Heading as="h3" size="sm">
            created: {format(Date.parse(createdAt), "Pp")}
          </Heading>
          <Heading as="h3" size="sm">
            due date:{format(Date.parse(dueDate), "Pp")}
          </Heading>
        </Box>
      </Box>
      {studentDataIsShowing ? (
        <Box>
          <Heading as="h2" size="lg">
            Student Progress
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
                  {score.student.name}{" "}
                  <strong>
                    {Math.round((correctCount / score.questionNumber) * 100)}%
                    done
                  </strong>
                </div>
              );
            })}
          </Box>
        </Box>
      ) : null}
      <Button
        variant="outline"
        onClick={(event) => deleteAssignmentHandler(event)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default Assignment;
