import * as React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@chakra-ui/core";
import Axios from "axios";
import {useHistory} from "react-router-dom";

const Login = () => {
  const {loginWithRedirect} = useAuth0();

  const history = useHistory();

  const checkIfUserExists = async () => {
    try {
      const existingUser = await Axios("/checkIfUserExists");
      if (existingUser) {
        return existingUser;
      }
    } catch (err) {
      console.log("no existing user");
      return null;
    }
  };

  const handleLogin = async () => {
    const user = await checkIfUserExists();
    if (user) {
      loginWithRedirect({
        customParameter: "myCustomParameter",
      });
    } else {
      history.push("/teacher-or-student");
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={handleLogin}>
        Login/Signup
      </Button>
    </>
  );
};

export default Login;
