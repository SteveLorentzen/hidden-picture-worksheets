import React, { useState, useEffect } from "react";
import { Box, Input, Heading, Button, Select } from "@chakra-ui/core";
import classes from "./NewAssignment.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const NewAssignment = ({ closeModalHandler, newAssignmentHandler }) => {
  const [newAssignmentInput, setNewAssignmentInput] = useState({
    assignmentName: "",
    worksheet: "",
    classroomAssigned: "",
    dueDate: null,
  });

  const [worksheets, setWorksheets] = useState([]);

  const [classrooms, setClassrooms] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAssignmentData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch("http://localhost:8080/assignment-data", {
          headers: {
            Authorization: "bearer " + token,
          },
        });
        const resData = await result.json();
        console.log(resData);
        setWorksheets(resData.worksheets);
        setClassrooms(resData.classrooms);
      } catch (err) {
        console.log(err);
      }
    };
    getAssignmentData();
  }, [getAccessTokenSilently]);

  const inputHandler = (event) => {
    setNewAssignmentInput({
      ...newAssignmentInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Box className={classes.NewAssignment}>
        <Heading as="h1" className={classes.Title}>
          New Assignment
        </Heading>
        <Box>
          <label htmlFor="assignmentName">Assignment Name</label>
          <Input
            name="assignmentName"
            placeholder="assignment name"
            onChange={inputHandler}
          ></Input>
        </Box>
        <Box>
          <label htmlFor="worksheet">Worksheet</label>
          <Select
            name="worksheet"
            placeholder="select a worksheet"
            onChange={inputHandler}
          >
            {worksheets.map((worksheet) => {
              return (
                <option key={worksheet._id} value={worksheet._id}>
                  {worksheet.worksheetName}
                </option>
              );
            })}
          </Select>
        </Box>

        <Box>
          <label htmlFor="classroomAssigned">Assign to</label>
          <Select
            name="classroomAssigned"
            placeholder="select a classroom"
            onChange={inputHandler}
          >
            {classrooms.map((classroom) => {
              return (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              );
            })}
          </Select>
        </Box>

        <Box>
          <label htmlFor="dueDate">Due Date</label>
          <Input
            type="datetime-local"
            name="dueDate"
            onChange={inputHandler}
          ></Input>
        </Box>
        <Box className={classes.ButtonBox}>
          <Button
            variant="ghost"
            className={classes.CancelButton}
            onClick={closeModalHandler}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className={classes.AssignButton}
            onClick={() => newAssignmentHandler(newAssignmentInput)}
          >
            Assign!
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewAssignment;
