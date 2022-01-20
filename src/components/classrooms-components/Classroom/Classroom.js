import React, {useState, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Heading, Box, Spinner} from "@chakra-ui/core";
import Student from "../Student/Student";
import classes from "./Classroom.module.css";
import axios from "axios";

const Classroom = ({classroomName, classroomCode, classroomId}) => {
  const [students, setStudents] = useState([]);

  const [deleteTracker, setDeleteTracker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const {getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    setIsLoading(true);
    const getStudents = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await axios("/get-students/" + classroomId, {
          headers: {
            Authorization: "bearer " + token,
          },
        });
        console.log(result);
        setStudents(result.data.students);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, [deleteTracker, getAccessTokenSilently, classroomCode, classroomId]);

  const removeHandler = async (id) => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await axios("/delete-student", {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        data: {
          id,
          classroomId,
        },
      });
      console.log(result);
      setDeleteTracker(!deleteTracker);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box textAlign="center" margin="30px">
        <Box>
          {students.length < 1 && !isLoading ? (
            <Box className={classes.Classroom}>
              <Heading as="h2">
                There are no students in{" "}
                <strong className={classes.Accent}>{classroomName}</strong> yet.
              </Heading>
              <Box className={classes.Instructions}>
                <Box className={classes.SendMessage}>
                  <Heading as="h3" size="md">
                    Give your students the classroom code:{" "}
                  </Heading>
                  <Heading as="h2" className={classes.Code}>
                    {classroomCode}
                  </Heading>
                </Box>
                <Box className={classes.EnterInstructions}>
                  <Heading as="h3" size="md" className={classes.Enter}>
                    {" "}
                    Have them enter it at
                  </Heading>
                  <Heading as="h3" size="md" className={classes.Url}>
                    {" "}
                    HiddenPictureWorksheets.com/join
                  </Heading>
                </Box>
              </Box>
            </Box>
          ) : (
            <Heading as="h2">
              Students in{" "}
              <strong className={classes.Accent}>{classroomName}</strong>:
            </Heading>
          )}
          <Box h="25px">{isLoading ? <Spinner size="sm" /> : null}</Box>
        </Box>

        {students
          ? students.map((student) => {
              return (
                <Student
                  key={student._id}
                  name={student.name}
                  email={student.email}
                  profilePicture={student.profilePicture}
                  removeHandler={() => removeHandler(student._id)}
                />
              );
            })
          : null}
      </Box>
    </>
  );
};

export default Classroom;
