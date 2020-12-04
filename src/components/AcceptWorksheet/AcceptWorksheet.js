import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const AcceptWorksheet = () => {
  const { loginWithRedirect } = useAuth0();

  const params = useParams();

  const worksheetId = params.worksheetId;

  useEffect(() => {
    localStorage.setItem("worksheetId", worksheetId);
    loginWithRedirect();
  }, [loginWithRedirect, worksheetId]);

  console.log(params.worksheetId);

  return <div>hello</div>;
};

export default AcceptWorksheet;
