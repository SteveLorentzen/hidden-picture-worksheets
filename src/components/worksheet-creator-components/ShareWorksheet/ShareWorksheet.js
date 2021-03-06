import React, { useState } from "react";
import { Heading, Box, Input, Button } from "@chakra-ui/core";
import classes from "./ShareWorksheet.module.css";
import axios from "axios";

const ShareWorksheet = ({ worksheetId, worksheetName, closeModalHandler }) => {
  const [email, setEmail] = useState("");

  const shareWorksheetHandler = async () => {
    try {
      const result = await axios.post("/send-shared-worksheet", {
        data: {
          email,
          worksheetId: worksheetId,
        },
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    closeModalHandler();
  };

  return (
    <Box className={classes.Share}>
      <Box className={classes.TitleBox}>
        <Heading as="h1" size="xl" className={classes.Title}>
          Share Worksheet
        </Heading>
        <hr style={{ marginBottom: "15px" }} />
      </Box>

      <Heading as="h2" size="lg" className={classes.WorksheetName}>
        {worksheetName}
      </Heading>
      <Input
        variant="outline"
        placeholder="Email address"
        onChange={(event) => setEmail(event.target.value)}
      ></Input>
      <Box className={classes.ButtonBox}>
        <Button
          margin="5px"
          variant="ghost"
          width="150px"
          onClick={closeModalHandler}
        >
          cancel
        </Button>
        <Button
          margin="auto"
          variant="outline"
          width="175px"
          onClick={shareWorksheetHandler}
        >
          Share Worksheet!
        </Button>
      </Box>

      <Heading as="h3" size="md">
        Worksheets are shared as a completely separate copy.
      </Heading>
      <p>
        Changes made on the shared copy have no affect on your original
        worksheet.
      </p>
    </Box>
  );
};

export default ShareWorksheet;
