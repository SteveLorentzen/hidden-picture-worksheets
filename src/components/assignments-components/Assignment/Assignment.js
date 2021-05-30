import React, {useEffect, useState} from "react";
import classes from "./Assignment.module.css";
import axios from "axios";
import {Box, Heading, Button, Input} from "@chakra-ui/core";
import {format} from "date-fns";
import {AiFillEdit} from "react-icons/ai";
import {IconContext} from "react-icons/";
import Path from "../../common-components/Header/FileTree/Path/Path";

const Assignment = ({
  assignmentName,
  id,
  worksheetName,
  createdAt,
  dueDate,
  classroomName,
  questionNumber,
  // scores,
  deleteAssignmentHandler,
  selectAssignmentHandler,
  // isSelected,
  assignments,
  setAssignments,
}) => {
  const [studentDataIsShowing, setStudentDataIsShowing] = useState(false);

  const [editingAssignmentName, setEditingAssignmentName] = useState(false);

  const [assignmentNameInput, setAssignmentNameInput] = useState("");

  useEffect(() => {
    setAssignmentNameInput(assignmentName);
  }, [assignmentName]);

  const openAssignmentHandler = () => {
    setStudentDataIsShowing(!studentDataIsShowing);
  };

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

  // let assignmentClasses = classes.AssignmentOuterBox;

  // if (isSelected) {
  //   assignmentClasses = [classes.AssignmentOuterBox, classes.Selected].join(
  //     " "
  //   );
  // }

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
              {/* ({scores.length}{" "}
          {scores.length === 1 ? "student" : "students"}) */}
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
      {/* {isSelected ? (
        <Box>
          <Heading as="h2" size="lg">
            Student Progress
          </Heading>
          <Box className={classes.StudentProgressBox}>
            {scores.map((score) => {
              let correctCount = 0;

              Object.keys(score.questionAnswers).forEach((key) => {
                if (
                  score.questionAnswers[key].answer ===
                  score.questionAnswers[key].answerKey
                ) {
                  correctCount++;
                }
              });

              return (
                <div key={score.student._id} className={classes.Report}>
                  {score.student.name}{" "}
                  <strong>
                    {Math.round((correctCount / score.questionNumber) * 100)}%
                    done
                  </strong>
                </div>
              );
            })}
          </Box>
        </Box>
      ) : null} */}
    </Box>
  );
};

export default Assignment;
