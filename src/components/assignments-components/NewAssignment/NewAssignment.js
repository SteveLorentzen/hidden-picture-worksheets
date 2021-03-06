import React, { useState, useEffect } from "react";
import { Box, Input, Heading, Button, Select } from "@chakra-ui/core";
import classes from "./NewAssignment.module.css";
import axios from "axios";
import WorksheetTree from "./WorksheetTree/WorksheetTree";

const NewAssignment = ({ closeModalHandler, newAssignmentHandler }) => {
  const [newAssignmentInput, setNewAssignmentInput] = useState({
    assignmentName: "",
    worksheet: "",
    classroomAssigned: "",
    dueDate: null,
  });

  const [worksheets, setWorksheets] = useState([]);

  const [folders, setFolders] = useState([]);

  const [classrooms, setClassrooms] = useState([]);

  const [selectedWorksheet, setSelectedWorksheet] = React.useState({
    id: "",
    worksheetName: "",
  });

  useEffect(() => {
    let mounted = true;
    const getAssignmentData = async () => {
      try {
        const result = await axios.get("/assignment-data");
        console.log(result);
        if (mounted) {
          setWorksheets(result.data.worksheets);
          setFolders(result.data.folders);
          setClassrooms(result.data.classrooms);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAssignmentData();
    return () => (mounted = false);
  }, []);

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
          <Box className={classes.SelectedWorksheetBox}>
            <label htmlFor="worksheet">Selected worksheet:</label>
            <h5 className={classes.SelectedWorksheet}>
              {selectedWorksheet.worksheetName}
            </h5>
          </Box>

          <Box className={classes.WorksheetTreeBox}>
            <WorksheetTree
              name="worksheet"
              folders={folders}
              worksheets={worksheets}
              newAssignmentInput={newAssignmentInput}
              setNewAssignmentInput={setNewAssignmentInput}
              selectedWorksheet={selectedWorksheet}
              setSelectedWorksheet={setSelectedWorksheet}
            />
            {/* <label htmlFor="worksheet">Worksheet</label>
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
          </Select> */}
          </Box>
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
