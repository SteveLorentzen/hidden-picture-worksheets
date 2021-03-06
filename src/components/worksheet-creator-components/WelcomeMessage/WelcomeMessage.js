import * as React from "react";
import classes from "./WelcomeMessage.module.css";
import { Box, Heading } from "@chakra-ui/core";
import WorksheetTree from "../../assignments-components/NewAssignment/WorksheetTree/WorksheetTree";

const WelcomeMessage = () => {
  React.useEffect(() => {
    //TODO fetch folders, worksheets
  });

  return (
    <Box className={classes.WelcomeBox}>
      <Heading as="h1" size="xl" margin="15px">
        Welcome!
      </Heading>
      <Heading as="h2" size="md">
        Open the worksheet menu in the top left corner to{" "}
        <strong className={classes.Accent}>select</strong> or{" "}
        <strong className={classes.Accent}>create</strong> a worksheet.
      </Heading>
      {/* <WorksheetTree
        name="worksheet"
        folders={folders}
        worksheets={worksheets}
        newAssignmentInput={newAssignmentInput}
        setNewAssignmentInput={setNewAssignmentInput}
        selectedWorksheet={selectedWorksheet}
        setSelectedWorksheet={setSelectedWorksheet}
      /> */}
    </Box>
  );
};

export default WelcomeMessage;
