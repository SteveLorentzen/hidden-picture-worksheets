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
        <Heading as="h1">{worksheetName}</Heading>
        <Heading as="h2" size="sm">
          due: {formattedDate + amOrPm}
        </Heading>
        <Heading as="h3">{panelNumber} questions</Heading>
      </Box>
    </>
  );
};

export default AssignedWorksheet;
