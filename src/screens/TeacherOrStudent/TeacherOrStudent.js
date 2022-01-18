import {Button, Flex, Heading} from "@chakra-ui/core";

import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import Header from "../../components/common-components/Header/Header";

const TeacherOrStudent = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <>
      <Header isHeaderForJoinPage />
      <Flex
        flexDirection="column"
        alignItems="center"
        margin="3rem auto"
        justify="space-between"
        h="30vh"
      >
        <Heading as="h2">Are you a student or a teacher?</Heading>
        <Flex w="50%" justify="space-between">
          <Button
            onClick={() => {
              loginWithRedirect({role: "student"});
            }}
          >
            Student
          </Button>
          <Button
            onClick={() => {
              loginWithRedirect({role: "teacher"});
            }}
          >
            Teacher
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default TeacherOrStudent;
