import React, { useState, useEffect } from "react";
import classes from "./StudentAssignments.module.css";
import { Link } from "react-router-dom";
import StudentHeader from "../../components/common-components/StudentHeader/StudentHeader";
import { useAuth0 } from "@auth0/auth0-react";
import AssignedWorksheet from "../../components/student-assignments-components/AssignedWorksheet/AssignedWorksheet";
import { Spinner, Box, Heading } from "@chakra-ui/core";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setIsLoading(true);
    const getAssignedWorksheets = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch(
          "http://localhost:8080/assigned-worksheets",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        const resData = await result.json();
        console.log(resData);
        setAssignments(resData.assignedWorksheets);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAssignedWorksheets();
  }, [getAccessTokenSilently]);

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
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {assignments.map((assignment) => {
            return (
              <Link
                key={assignment._id}
                to={"/student-worksheet/" + assignment._id}
                className={classes.Link}
              >
                <AssignedWorksheet
                  worksheetName={assignment.worksheet.worksheetName}
                  dueDate={assignment.dueDate}
                  panelNumber={assignment.worksheet.panelNumber}
                />
              </Link>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default StudentAssignments;
