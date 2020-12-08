import React, { useState, useEffect } from "react";
import Header from "../../components/common-components/Header/Header";
import { Box, Heading, Button } from "@chakra-ui/core";
import classes from "./Assignments.module.css";
import Modal from "../../components/UI/Modal/Modal";
import NewAssignment from "../../components/assignments-components/NewAssignment/NewAssignment";
import { useAuth0 } from "@auth0/auth0-react";
import Assignment from "../../components/assignments-components/Assignment/Assignment";

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
  }, [getAccessTokenSilently, modalIsOpen]);

  const openAssignmentHandler = (assignment) => {
    console.log(assignment);
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
          />
        </Modal>
      ) : null}
      <Box className={classes.AssignmentsBox}>
        {assignments.map((assignment) => {
          return (
            <Assignment
              key={assignment._id}
              assignmentName={assignment.assignmentName}
              worksheetName={assignment.worksheet.worksheetName}
              classroomName={assignment.classroomAssigned.name}
              createdAt={assignment.createdAt}
              dueDate={assignment.dueDate}
              openAssignmentHandler={() => openAssignmentHandler(assignment)}
              students={assignment.classroomAssigned.students}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Assignments;
