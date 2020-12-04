import React, { useState } from "react";
import classes from "./JoinClassroom.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header/Header";
import { Button, Input, Box } from "@chakra-ui/core";

const JoinClassroom = () => {
  const [classroomCode, setClassroomCode] = useState("");

  const { loginWithRedirect } = useAuth0();

  const checkClassroomCode = async (code) => {
    try {
      const result = await fetch(
        "http://localhost:8080/auth/check-classroom-code/" + code
      );
      const resData = await result.json();
      console.log(resData);
      if (resData.codeIsValid) {
        localStorage.setItem("classroomCode", classroomCode);
        return classroomCode;
      } else {
        console.log(resData);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithCodeHandler = async (code) => {
    try {
      const validCode = await checkClassroomCode(code);
      if (validCode) {
        loginWithRedirect();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header isHeaderForJoinPage={true} />
      <Box className={classes.JoinClassroomBox}>
        <Input
          minWidth="150px"
          w="200px"
          onChange={(event) => setClassroomCode(event.target.value)}
          placeholder="Enter code"
          value={classroomCode}
        ></Input>
        <Button
          w="150px"
          minWidth="150px"
          onClick={() => loginWithCodeHandler(classroomCode)}
        >
          Join Classroom!
        </Button>
      </Box>
    </>
  );
};

export default JoinClassroom;
