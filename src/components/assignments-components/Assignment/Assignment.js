import React, { useState } from "react";
import classes from "./Assignment.module.css";
import { Box, Heading } from "@chakra-ui/core";
import { format } from "date-fns";

const Assignment = ({
  assignmentName,
  worksheetName,
  createdAt,
  dueDate,
  classroomName,
  students,
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
            worksheet: {worksheetName}
          </Heading>
          <Heading as="h2" size="md">
            classroom: {classroomName} ({students.length}{" "}
            {students.length === 1 ? "student" : "students"})
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
            Student Report
          </Heading>
          {students.map((student) => {
            return (
              <div key={student._id}>
                {student.name} <strong>0% progress</strong>
              </div>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
};

export default Assignment;
