import * as React from "react";
import { Heading, Box, Button } from "@chakra-ui/core";
import classes from "./SuccessMessage.module.css";

const SuccessMessage = ({ closeModalHandler }) => {
  return (
    <>
      <Box className={classes.Success}>
        <Heading as="h1" size="xl">
          Congratulations!
        </Heading>
        <Heading as="h2" size="md">
          You've completed this worksheet.
        </Heading>
        <p>Your work has been submitted.</p>
      </Box>
      <Button onClick={closeModalHandler}>Okay</Button>
    </>
  );
};

export default SuccessMessage;
