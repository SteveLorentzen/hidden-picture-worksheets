import React, {useState, useEffect} from "react";
import Header from "../../components/common-components/Header/Header";
import {Box, Heading, Button, Spinner} from "@chakra-ui/core";
import classes from "./Assignments.module.css";
import Modal from "../../components/UI/Modal/Modal";
import NewAssignment from "../../components/assignments-components/NewAssignment/NewAssignment";
import Assignment from "../../components/assignments-components/Assignment/Assignment";
import {timedStatusMessage} from "../../util/timedStatusMessage";
import axios from "axios";
import AssignmentReport from "./AssignmentReport/AssignmentReport";

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    // {
    //   assignmentName: "Period 2 Math",
    //   worksheet: worksheetId,
    //   createdAt: new Date().getTime(),
    //   classesAssignedTo: ["main", "secondary"],
    //   studentsAssignedTo: ["matthew", "greg"],
    //   dueDate: new Date().getTime() + 500000,
    //   reports: [reportIds],
    // },
  ]);

  const [selectedAssignment, setSelectedAssignment] = React.useState({});

  const [modalIsOpen, setModalIsOpen] = useState({
    newAssignment: false,
    studentReport: false,
  });

  const [status, setStatus] = useState({
    message: "",
    isError: false,
    spinner: false,
  });

  useEffect(() => {
    let mounted = true;
    const getAssignments = async () => {
      try {
        const result = await axios.get("/assignments");
        console.log(result);
        if (mounted) {
          setAssignments(result.data.assignments);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAssignments();
    return () => (mounted = false);
  }, []);

  const openAssignmentHandler = (assignment) => {
    console.log(assignment);
  };

  const deleteAssignmentHandler = async (event, assignmentId) => {
    setStatus({...status, message: "Deleting assignment...", spinner: true});
    event.stopPropagation();
    console.log("deleting");
    try {
      const result = await axios.delete("/delete-assignment", {
        data: {
          assignmentId,
        },
      });
      console.log(result);
      const updatedAssignments = assignments.filter((assignment) => {
        return assignment._id !== result.data.assignmentId;
      });
      console.log(updatedAssignments);
      setAssignments(updatedAssignments);
      timedStatusMessage(result.data.message, result.data.isError, setStatus);
    } catch (err) {
      console.log(err);
      timedStatusMessage(err.message, true, setStatus);
    }
  };

  const newAssignmentHandler = async (newAssignmentInput) => {
    console.log(newAssignmentInput);
    setStatus({
      ...status,
      message: "Creating new assignment...",
      spinner: true,
    });
    setModalIsOpen({...modalIsOpen, newAssignment: false});
    try {
      const result = await axios.post("/create-assignment", {
        assignmentName: newAssignmentInput.assignmentName,
        worksheet: newAssignmentInput.worksheet,
        classroomAssigned: newAssignmentInput.classroomAssigned,
        dueDate: newAssignmentInput.dueDate,
      });
      console.log(result);
      if (result.data.assignment) {
        const updatedAssignments = [...assignments];
        updatedAssignments.push(result.data.assignment);
        setAssignments(updatedAssignments);
      }
      timedStatusMessage(result.data.message, result.data.isError, setStatus);
    } catch (err) {
      console.log("anything");
      console.log(err);
      timedStatusMessage(err.message, true, setStatus);
    }
  };

  const selectAssignmentHandler = (assignment) => {
    setSelectedAssignment({
      assignmentName: assignment.assignmentName,
      scores: assignment.scores,
    });
  };

  return (
    <>
      <Header />
      <Box className={classes.Assignments}>
        <Heading as="h1">Assignments</Heading>

        <Box className={classes.StatusMessageOuterBox}>
          {status.message !== "" ? (
            <Box className={classes.StatusMessageBox}>
              {status.spinner ? <Spinner className={classes.Spinner} /> : null}
              <p
                className={
                  status.isError
                    ? [classes.StatusMessage, classes.Error].join(" ")
                    : classes.StatusMessage
                }
              >
                {status.message}
              </p>
            </Box>
          ) : null}
        </Box>

        <Box className={classes.AssignmentBox}></Box>
      </Box>
      {modalIsOpen.newAssignment ? (
        <Modal
          closeModalHandler={() =>
            setModalIsOpen({...modalIsOpen, newAssignment: false})
          }
        >
          <NewAssignment
            closeModalHandler={() => {
              setModalIsOpen({
                ...modalIsOpen,
                newAssignment: false,
              });
            }}
            newAssignmentHandler={newAssignmentHandler}
          />
        </Modal>
      ) : null}
      <Box className={classes.CurrentAssignmentsBox}>
        <Heading as="h2" margin="0 20px 20px 5%" size="lg">
          Current Assignments:
        </Heading>
        <Button
          className={classes.AssignmentButton}
          placeholder="New Assignment"
          onClick={() => setModalIsOpen({...modalIsOpen, newAssignment: true})}
        >
          New Assignment
        </Button>
      </Box>

      <Box className={classes.AssignmentsBox}>
        {assignments.filter((assignment) => {
          return new Date(assignment.dueDate) > new Date();
        }).length === 0 ? (
          <Heading as="h3" size="lg">
            No assignments due
          </Heading>
        ) : (
          assignments
            .filter((assignment) => {
              return new Date(assignment.dueDate) > new Date();
            })
            .map((assignment) => {
              return (
                <Assignment
                  key={assignment._id}
                  // question - better to just pass an argument called 'assignment'?
                  assignmentName={assignment.assignmentName}
                  id={assignment._id}
                  worksheetName={assignment.worksheet.worksheetName}
                  questionNumber={assignment.worksheet.panelNumber}
                  classroomName={assignment.classroomAssigned.name}
                  createdAt={assignment.createdAt}
                  dueDate={assignment.dueDate}
                  openAssignmentHandler={() =>
                    openAssignmentHandler(assignment)
                  }
                  deleteAssignmentHandler={(event) =>
                    deleteAssignmentHandler(event, assignment._id)
                  }
                  selectAssignmentHandler={() =>
                    selectAssignmentHandler(assignment)
                  }
                  assignments={assignments}
                  setAssignments={setAssignments}
                />
              );
            })
        )}
      </Box>
      <Heading as="h2" margin="20px 5%" size="lg">
        Past Assignments:
      </Heading>
      <Box className={classes.AssignmentsBox}>
        {assignments
          .filter((assignment) => {
            return new Date(assignment.dueDate) < new Date();
          })
          .map((assignment) => {
            return (
              <Assignment
                key={assignment._id}
                // question - better to just pass an argument called 'assignment'?
                assignmentName={assignment.assignmentName}
                id={assignment._id}
                worksheetName={assignment.worksheet.worksheetName}
                questionNumber={assignment.worksheet.panelNumber}
                classroomName={assignment.classroomAssigned.name}
                createdAt={assignment.createdAt}
                dueDate={assignment.dueDate}
                openAssignmentHandler={() => openAssignmentHandler(assignment)}
                deleteAssignmentHandler={(event) =>
                  deleteAssignmentHandler(event, assignment._id)
                }
                selectAssignmentHandler={() =>
                  selectAssignmentHandler(assignment)
                }
                assignments={assignments}
                setAssignments={setAssignments}
              />
            );
          })}
      </Box>
      {selectedAssignment.assignmentName ? (
        <Modal
          closeModalHandler={() =>
            setSelectedAssignment({assignmentName: "", scores: []})
          }
        >
          <AssignmentReport
            scores={selectedAssignment.scores}
            assignmentName={selectedAssignment.assignmentName}
            closeModalHandler={() =>
              setSelectedAssignment({assignmentName: "", scores: []})
            }
          />
        </Modal>
      ) : null}
    </>
  );
};

export default Assignments;
