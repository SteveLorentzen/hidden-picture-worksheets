import React, { useState, useEffect } from "react";
import Header from "../../components/common-components/Header/Header";
import { Box, Heading, Button, Spinner } from "@chakra-ui/core";
import classes from "./Assignments.module.css";
import Modal from "../../components/UI/Modal/Modal";
import NewAssignment from "../../components/assignments-components/NewAssignment/NewAssignment";
import { useAuth0 } from "@auth0/auth0-react";
import Assignment from "../../components/assignments-components/Assignment/Assignment";
import { timedStatusMessage } from "../../util/timedStatusMessage";

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

  const [modalIsOpen, setModalIsOpen] = useState({
    newAssignment: false,
  });

  const [status, setStatus] = useState({
    message: "",
    isError: false,
    spinner: false,
  });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch("http://localhost:8080/assignments", {
          headers: {
            Authorization: "bearer " + token,
          },
        });
        const resData = await result.json();
        console.log(resData);
        setAssignments(resData.assignments);
      } catch (err) {
        console.log(err);
      }
    };
    getAssignments();
  }, [getAccessTokenSilently]);

  const openAssignmentHandler = (assignment) => {
    console.log(assignment);
  };

  const deleteAssignmentHandler = async (event, assignmentId) => {
    setStatus({ ...status, message: "Deleting assignment...", spinner: true });
    event.stopPropagation();
    console.log("deleting");
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch("http://localhost:8080/delete-assignment", {
        method: "delete",
        headers: {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId,
        }),
      });
      const resData = await result.json();
      console.log(resData);
      const updatedAssignments = assignments.filter((assignment) => {
        return assignment._id !== resData.assignmentId;
      });
      console.log(updatedAssignments);
      setAssignments(updatedAssignments);
      timedStatusMessage(resData.message, resData.isError, setStatus);
    } catch (err) {
      console.log(err);
      timedStatusMessage(err.message, true, setStatus);
    }
  };

  const newAssignmentHandler = async (newAssignmentInput) => {
    setStatus({
      ...status,
      message: "Creating new assignment...",
      spinner: true,
    });
    setModalIsOpen({ ...modalIsOpen, newAssignment: false });
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch("http://localhost:8080/create-assignment", {
        method: "post",
        headers: {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentName: newAssignmentInput.assignmentName,
          worksheet: newAssignmentInput.worksheet,
          classroomAssigned: newAssignmentInput.classroomAssigned,
          dueDate: newAssignmentInput.dueDate,
        }),
      });
      const resData = await result.json();
      console.log(resData);
      if (resData.assignment) {
        const updatedAssignments = [...assignments];
        updatedAssignments.push(resData.assignment);
        setAssignments(updatedAssignments);
      }
      timedStatusMessage(resData.message, resData.isError, setStatus);
    } catch (err) {
      console.log("anything");
      console.log(err);
      timedStatusMessage(err.message, true, setStatus);
    }
  };

  return (
    <>
      <Header />
      <Box className={classes.Assignments}>
        <Heading as="h1">Assignments</Heading>
        <Button
          className={classes.AssignmentButton}
          placeholder="New Assignment"
          onClick={() =>
            setModalIsOpen({ ...modalIsOpen, newAssignment: true })
          }
        >
          New Assignment
        </Button>
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
            setModalIsOpen({ ...modalIsOpen, newAssignment: false })
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
      <Box className={classes.AssignmentsBox}>
        {assignments.map((assignment) => {
          return (
            <Assignment
              key={assignment._id}
              // question - better to just pass an argument called 'assignment'?
              assignmentName={assignment.assignmentName}
              worksheetName={assignment.worksheet.worksheetName}
              classroomName={assignment.classroomAssigned.name}
              createdAt={assignment.createdAt}
              dueDate={assignment.dueDate}
              openAssignmentHandler={() => openAssignmentHandler(assignment)}
              scores={assignment.scores}
              deleteAssignmentHandler={(event) =>
                deleteAssignmentHandler(event, assignment._id)
              }
            />
          );
        })}
      </Box>
    </>
  );
};

export default Assignments;
