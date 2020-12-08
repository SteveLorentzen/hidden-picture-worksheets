import React from "react";
import { Heading, Box } from "@chakra-ui/core";
import classes from "./AssignedWorksheet.module.css";
import { format } from "date-fns";

const AssignedWorksheet = ({
  worksheetName,
  dueDate,
  openWorksheetHandler,
  panelNumber,
}) => {
  const formattedDate = format(Date.parse(dueDate), "PPPPpppp")
    .split(":")
    .slice(0, 2)
    .join(":");

  const amOrPm = format(Date.parse(dueDate), "PPPPpppp")
    .split(":")
    .slice(2, 3)[0]
    .split(" ")[1];

  return (
    <>
      <Box className={classes.AssignedWorksheet} onClick={openWorksheetHandler}>
        <Box display="flex" alignItems="center">
          <Heading as="h1" className={classes.WorksheetTitle}>
            {worksheetName}
          </Heading>
        </Box>

        <Box display="flex" alignItems="center">
          <Heading as="h2" size="sm" className={classes.WorksheetDueDate}>
            due: {formattedDate + amOrPm}
          </Heading>
        </Box>

        <Box display="flex" alignItems="center">
          <Heading as="h3" size="md" className={classes.WorksheetProgress}>
            {panelNumber} questions
          </Heading>
        </Box>
      </Box>
    </>
  );
};

export default AssignedWorksheet;
