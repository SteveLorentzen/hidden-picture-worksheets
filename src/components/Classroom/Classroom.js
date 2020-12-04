import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Heading, Box, Spinner } from "@chakra-ui/core";
import Student from "../Student/Student";

const Classroom = ({ classroomName, classroomCode, classroomId }) => {
  //   const [studentEmail, setStudentEmail] = useState("");

  const [students, setStudents] = useState([]);

  const [deleteTracker, setDeleteTracker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch(
          "http://localhost:8080/get-students/" + classroomId,
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        const resData = await result.json();
        setStudents(resData.students);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, [deleteTracker, getAccessTokenSilently, classroomCode, classroomId]);

  //   const formData = new FormData();
  //   formData.append("studentEmail", studentEmail);

  //   const inviteHandler = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       const result = await fetch("http://localhost:8080/join-classroom", {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Authorization: "bearer " + token,
  //         },
  //       });
  //       const resData = await result.json();
  //       console.log(resData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const removeHandler = async (id) => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch("http://localhost:8080/delete-student", {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          classroomId,
        }),
      });
      const resData = await result.json();
      setDeleteTracker(!deleteTracker);
      setIsLoading(false);
      console.log(resData);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Box textAlign="center" margin="20px auto">
        <Heading margin="auto" as="h1">
          {name}
        </Heading>
      </Box>
      <Box className={classes.InviteOptions}>
        <Box
          className={classes.EmailInvite}
          border="1px solid black"
          padding="40px"
          borderRadius="10px"
          w="25%"
        >
          <Heading as="h3" size="lg" marginBottom="10px">
            Email invitation
          </Heading>
          <Box className={classes.EmailInviteInput}>
            <Input
              w="75%"
              onChange={(event) => setStudentEmail(event.target.value)}
              placeholder="Student Email"
            />
            <Button onClick={inviteHandler}>Send Invites</Button>
          </Box>
        </Box>
        <Heading as="h3" size="lg" margin="0 50px">
          or
        </Heading>
        <Box
          w="25%"
          border="1px solid black"
          padding="40px"
          borderRadius="10px"
        >
          <Heading as="h3" size="lg" marginBottom="10px">
            Use classroom code
          </Heading>
          <Button onClick={() => setClassroomCodeModalIsOpen(true)}>
            View Code
          </Button>
        </Box>
      </Box>*/}
      <Box textAlign="center" margin="30px">
        <Box>
          <Heading as="h2">Students in {classroomName}:</Heading>
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
      {/* {classroomCodeModalIsOpen ? (
        <Modal closeModalHandler={() => setClassroomCodeModalIsOpen(false)}>
          <Heading as="h2" size="md">
            Your Classroom Code is:
          </Heading>
          <Heading
            as="h3"
            size="lg"
            fontWeight="bolder"
            textAlign="center"
            margin="10px"
          >
            {code}
          </Heading>
          <Heading as="h3" size="md">
            Have your students go to
          </Heading>
          <Heading as="h2" size="sm" textAlign="center" margin="10px">
            http://localhost:3000/join
          </Heading>
          <Heading as="h3" size="md">
            and enter the code
          </Heading>
        </Modal>
      ) : null} */}
    </>
  );
};

export default Classroom;
