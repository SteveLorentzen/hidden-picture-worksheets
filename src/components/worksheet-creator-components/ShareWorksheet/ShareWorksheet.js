import React, { useState } from "react";
import { Heading, Box, Input, Button } from "@chakra-ui/core";
import classes from "./ShareWorksheet.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const ShareWorksheet = ({ worksheetId, worksheetName, closeModalHandler }) => {
  const [email, setEmail] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const shareWorksheetHandler = async () => {
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch(
        "http://localhost:8080/send-shared-worksheet",
        {
          method: "post",
          headers: {
            Authorization: "bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            worksheetId: worksheetId,
          }),
        }
      );
      const resData = await result.json();
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
    closeModalHandler();
  };

  return (
    <Box className={classes.Share}>
      <Box
        marginBottom="20px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
      >
        <Heading as="h1" size="xl" className={classes.Title}>
          Share Worksheet
        </Heading>
        <p>(With another teacher)</p>
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
          variantColor="teal"
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
