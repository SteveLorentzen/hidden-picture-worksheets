import classes from "./DeleteCheck.module.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Heading } from "@chakra-ui/core";
import ButtonCustom from "../../components/UI/ButtonCustom/ButtonCustom";

const DeleteCheck = ({
  setTimedMessage,
  closeModalHandler,
  worksheetId,
  setActiveWorksheet,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteWorksheetHandler = async (worksheetId) => {
    setTimedMessage({ message: "deleting", showing: true });
    try {
      const token = await getAccessTokenSilently();
      console.log(worksheetId);
      const res = await fetch(
        "http://localhost:8080/worksheet/" + worksheetId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      closeModalHandler();

      if (resData.err) {
        setTimedMessage({ message: resData.message, showing: true, err: true });
        setTimeout(
          () => setTimedMessage({ message: "", showing: false, err: false }),
          10000
        );
      } else {
        setTimedMessage({ message: resData.message, showing: true });
        setTimeout(
          () => setTimedMessage({ message: "", showing: false }),
          1500
        );
        setActiveWorksheet(null);
      }
    } catch (err) {
      console.log(err);
      setTimedMessage({ message: "Failed to Delete :(", showing: true });
      setTimeout(() => setTimedMessage({ message: "", showing: false }), 7500);
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
