import React from "react";
import { Heading, Box } from "@chakra-ui/core";
import classes from "./AssignedWorksheet.module.css";
import { format } from "date-fns";
import { IoIosCheckmark } from "react-icons/io";
import { IconContext } from "react-icons";

const AssignedWorksheet = ({
  worksheetName,
  dueDate,
  openWorksheetHandler,
  panelNumber,
  questionAnswers,
}) => {
  const formattedDate = format(Date.parse(dueDate), "PPPPpppp")
    .split(":")
    .slice(0, 2)
    .join(":");

  const amOrPm = format(Date.parse(dueDate), "PPPPpppp")
    .split(":")
    .slice(2, 3)[0]
    .split(" ")[1];

  let correctCount = 0;

  Object.keys(questionAnswers).forEach((key) => {
    if (questionAnswers[key].answer === questionAnswers[key].answerKey) {
      correctCount++;
    }
  });

  let isCompleted = false;

  if (correctCount / panelNumber === 1) {
    isCompleted = true;
  }

  return (
    <>
      <Box
        className={
          isCompleted
            ? [classes.AssignedWorksheet, classes.Completed].join(" ")
            : classes.AssignedWorksheet
        }
        onClick={openWorksheetHandler}
      >
        <Box display="flex" alignItems="center">
          <Heading as="h1" className={classes.WorksheetTitle}>
            {worksheetName}
          </Heading>
          {isCompleted ? (
            <Box display="flex" alignItems="center">
              <p className={classes.CompletedTag}>Completed!</p>
              <IconContext.Provider
                value={{
                  size: "2em",
                  color: "green",
                  className: `${classes.Icons}`,
                }}
              >
                <IoIosCheckmark className={classes.CompletedCheckmark} />
              </IconContext.Provider>
            </Box>
          ) : null}
        </Box>

        <Box display="flex" alignItems="center">
          <Heading as="h2" size="sm" className={classes.WorksheetDueDate}>
            due: {formattedDate + amOrPm}
          </Heading>
        </Box>

        <Box display="flex" alignItems="center">
          <Heading as="h3" size="md" className={classes.WorksheetProgress}>
            progress: {correctCount} / {panelNumber} questions
          </Heading>
        </Box>
      </Box>
    </>
  );
};

export default AssignedWorksheet;
