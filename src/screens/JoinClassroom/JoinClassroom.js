import React, {useState} from "react";
import classes from "./JoinClassroom.module.css";
import {useAuth0} from "@auth0/auth0-react";
import Header from "../../components/common-components/Header/Header";
import {Button, Input, Box} from "@chakra-ui/core";
import axios from "axios";

const JoinClassroom = () => {
  const [classroomCode, setClassroomCode] = useState("");

  const {loginWithRedirect} = useAuth0();

  const checkClassroomCode = async (code) => {
    try {
      const result = await axios.get("/auth/check-classroom-code/" + code);
      console.log(result);
      if (result.data.codeIsValid) {
        localStorage.setItem("classroomCode", classroomCode);
        return classroomCode;
      } else {
        console.log(result);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithCodeHandler = async (code) => {
    console.log("this ran");
    try {
      const validCode = await checkClassroomCode(code);
      if (validCode) {
        loginWithRedirect({
          myLittleTest: "A test!",
        });
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
