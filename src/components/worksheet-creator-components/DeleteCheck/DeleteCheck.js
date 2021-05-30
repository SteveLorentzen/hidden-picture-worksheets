import classes from "./DeleteCheck.module.css";
import React from "react";
import {Button, Box, Heading} from "@chakra-ui/core";
import ButtonCustom from "../../UI/ButtonCustom/ButtonCustom";
import axios from "axios";

const DeleteCheck = ({
  setTimedMessage,
  closeModalHandler,
  worksheetId,
  setActiveWorksheet,
}) => {
  const deleteWorksheetHandler = async (worksheetId) => {
    setTimedMessage({message: "deleting", showing: true});
    try {
      console.log(worksheetId);
      const result = await axios.delete("/delete-worksheet/" + worksheetId);
      console.log(result);
      closeModalHandler();

      if (result.data.err) {
        setTimedMessage({
          message: result.data.message,
          showing: true,
          err: true,
        });
        setTimeout(
          () => setTimedMessage({message: "", showing: false, err: false}),
          10000
        );
      } else {
        setTimedMessage({message: result.data.message, showing: true});
        setTimeout(() => setTimedMessage({message: "", showing: false}), 1500);
        setActiveWorksheet(null);
      }
    } catch (err) {
      console.log(err);
      setTimedMessage({message: "Failed to Delete :(", showing: true});
      setTimeout(() => setTimedMessage({message: "", showing: false}), 7500);
    }
  };

  return (
    <>
      <Box>
        <Heading marginBottom="10px" as="h2" size="lg">
          Are you sure you want to delete this worksheet?
        </Heading>
      </Box>
      <div className={classes.ConfirmOrCancel}>
        <Button
          variant="ghost"
          className={classes.Cancel}
          onClick={closeModalHandler}
        >
          Cancel
        </Button>
        <ButtonCustom
          className={classes.Confirm}
          clicked={() => deleteWorksheetHandler(worksheetId)}
        >
          Confirm Delete
        </ButtonCustom>
      </div>
    </>
  );
};

export default DeleteCheck;
