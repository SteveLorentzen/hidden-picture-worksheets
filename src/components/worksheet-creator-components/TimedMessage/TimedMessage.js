import * as React from "react";
import classes from "./TimedMessage.module.css";
import { Heading } from "@chakra-ui/core";

const TimedMessage = ({ timedMessage }) => {
  return (
    <div className={classes.TimedMessageBox}>
      {timedMessage.showing ? (
        <Heading
          as="h6"
          className={
            timedMessage.err ? classes.TimedMessage : classes.TimedErrMessage
          }
        >
          {timedMessage.message}
        </Heading>
      ) : null}
    </div>
  );
};

export default TimedMessage;
