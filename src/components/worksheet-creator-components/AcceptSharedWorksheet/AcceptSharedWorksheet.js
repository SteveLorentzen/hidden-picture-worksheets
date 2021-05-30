import * as React from "react";
import { Button, Box } from "@chakra-ui/core";
import classes from "./AcceptSharedWorksheet.module.css";

const AcceptSharedWorksheet = ({
  sharedWorksheetMessage,
  setAcceptWorksheetModalIsOpen,
}) => {
  return (
    <Box className={classes.AcceptWorksheet}>
      <h1 className={classes.Message}>{sharedWorksheetMessage}</h1>
      <Button
        className={classes.Button}
        variant="outline"
        onClick={() => setAcceptWorksheetModalIsOpen(false)}
      >
        Ok
      </Button>
    </Box>
  );
};

export default AcceptSharedWorksheet;
