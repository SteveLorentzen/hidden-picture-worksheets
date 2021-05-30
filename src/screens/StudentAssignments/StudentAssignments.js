import React, { useState, useEffect } from "react";
import classes from "./StudentAssignments.module.css";
import { Link, useHistory } from "react-router-dom";
import StudentHeader from "../../components/common-components/StudentHeader/StudentHeader";
import AssignedWorksheet from "../../components/student-assignments-components/AssignedWorksheet/AssignedWorksheet";
import { Spinner, Box, Heading, Button } from "@chakra-ui/core";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";

const StudentAssignments = () => {
  const [scores, setScores] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [thisWorksheetIsLate, setThisWorksheetIsLate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const getAssignedWorksheets = async () => {
      try {
        const result = await axios.get("/assigned-worksheets");
        console.log(result);
        setScores(result.data.scores);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAssignedWorksheets();
  }, []);

  const openWorksheetHandler = (id, dueDate) => {
    if (new Date(dueDate) < new Date()) {
      return setThisWorksheetIsLate(true);
    }
    history.push("/student-worksheet/" + id);
  };

  return (
    <>
      <StudentHeader />
      <Box className={classes.GreetingBox}>
        <Heading as="h1" size="xl">
          Welcome <strong style={{ color: "tomato" }}>Students</strong>!
        </Heading>
        <Heading as="h2" size="lg">
          Select a worksheet:
        </Heading>
      </Box>

      {isLoading ? (
        <Box className={classes.Spinner}>
          <Spinner size="lg" />
        </Box>
      ) : (
        <Box className={classes.AssignmentBox}>
          {scores
            .filter((score) => {
              console.log(score.assignment.dueDate, new Date(Date.now()));
              return new Date(score.assignment.dueDate) > new Date(Date.now());
            })
            .map((score) => {
              return (
                <AssignedWorksheet
                  worksheetName={score.assignment.worksheet.worksheetName}
                  dueDate={score.assignment.dueDate}
                  panelNumber={score.assignment.worksheet.panelNumber}
                  questionAnswers={score.questionAnswers}
                  openWorksheetHandler={() =>
                    openWorksheetHandler(
                      score.assignment._id,
                      score.assignment.dueDate
                    )
                  }
                />
              );
            })}
        </Box>
      )}
      {thisWorksheetIsLate ? (
        <Modal
          size="small"
          closeModalHandler={() => setThisWorksheetIsLate(false)}
        >
          <Heading as="h2">
            Sorry, this worksheet is no longer available.
          </Heading>
          <Button onClick={() => setThisWorksheetIsLate(false)}>Close</Button>
        </Modal>
      ) : null}
    </>
  );
};

export default StudentAssignments;
