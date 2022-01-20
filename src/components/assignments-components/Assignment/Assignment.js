import React, {useEffect, useState} from "react";
import classes from "./Assignment.module.css";
import axios from "axios";
import {Box, Heading, Button, Input} from "@chakra-ui/core";
import {format} from "date-fns";
import {AiFillEdit} from "react-icons/ai";
import {IconContext} from "react-icons/";

const Assignment = ({
  assignmentName,
  id,
  worksheetName,
  createdAt,
  dueDate,
  classroomName,
  questionNumber,
  deleteAssignmentHandler,
  selectAssignmentHandler,
  assignments,
  setAssignments,
}) => {
  const [editingAssignmentName, setEditingAssignmentName] = useState(false);

  const [assignmentNameInput, setAssignmentNameInput] = useState("");

  useEffect(() => {
    setAssignmentNameInput(assignmentName);
  }, [assignmentName]);

  const editingHandler = (event) => {
    event.stopPropagation();
    setEditingAssignmentName(!editingAssignmentName);
  };

  const submitChangesHandler = async (event) => {
    event.stopPropagation();
    try {
      const result = await axios.put("/edit-assignment-name/" + id, {
        editedName: assignmentNameInput,
      });
      const updatedAssignments = assignments.map((assignment) => {
        if (assignment._id === id) {
          return {...assignment, assignmentName: result.data.assignmentName};
        } else return assignment;
      });
      console.log(updatedAssignments);
      setAssignments(updatedAssignments);
      setEditingAssignmentName(false);
    } catch (err) {
      console.log(err);
    }
  };

  const preventHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      className={classes.AssignmentOuterBox}
      onClick={selectAssignmentHandler}
    >
      <Box className={classes.AssignmentBox}>
        <Box className={classes.AssignmentTitleBox}>
          <Box className={classes.AssignmentNameBox}>
            {editingAssignmentName ? (
              <Box className={classes.InputBox}>
                <Input
                  placeholder="assignment name"
                  onChange={(event) =>
                    setAssignmentNameInput(event.target.value)
                  }
                  onClick={(event) => preventHandler(event)}
                  value={assignmentNameInput}
                ></Input>
                <Button onClick={submitChangesHandler}>Submit</Button>
              </Box>
            ) : (
              <Heading as="h1" size="lg" className={classes.AssignmentName}>
                {assignmentName}
              </Heading>
            )}
            <IconContext.Provider value={{size: "1.5rem"}}>
              <AiFillEdit
                className={classes.EditIcon}
                onClick={(event) => editingHandler(event)}
              />
            </IconContext.Provider>
          </Box>

          <Heading as="h3" size="sm" className={classes.Due}>
            {`Due ${format(Date.parse(dueDate), "Pp")}`}
          </Heading>
        </Box>

        <Box className={classes.WorksheetNameBox}>
          <Box className={classes.DescriptionBox}>
            <Heading as="h2" size="sm" className={classes.Category}>
              Worksheet:
            </Heading>
            <Heading as="h2" size="md" className={classes.WorksheetName}>
              {worksheetName}
            </Heading>
          </Box>
          <Box className={classes.DescriptionBox}>
            <Heading as="h2" size="sm" className={classes.Category}>
              Classroom:
            </Heading>
            <Heading as="h2" size="md">
              {classroomName}
            </Heading>
          </Box>
        </Box>
        <Box className={classes.CreatedAtQuestionNumberBox}>
          <Box className={classes.CreatedAtBox}>
            <Heading as="h2" size="sm" className={classes.Category}>
              Created:
            </Heading>
            <Heading as="h3" size="sm" className={classes.CreatedAt}>
              {format(Date.parse(createdAt), "Pp")}
            </Heading>
          </Box>
          <Box className={classes.QuestionNumberBox}>
            <Heading as="h2" size="sm" className={classes.Category}>
              Number of Questions:
            </Heading>
            <Heading as="h3" size="sm" className={classes.QuestionNumber}>
              {questionNumber}
            </Heading>
          </Box>
        </Box>

        <Box className={classes.ButtonBox}>
          <Button
            variant="outline"
            onClick={(event) => deleteAssignmentHandler(event)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Assignment;
