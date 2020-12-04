import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import WorksheetCreator from "./components/WorksheetCreator/WorksheetCreator";
import Classroom from "./components/Classroom/Classroom";
import JoinClassroom from "./components/JoinClassroom/JoinClassroom";
import { useAuth0 } from "@auth0/auth0-react";
import Classrooms from "./components/Classrooms/Classrooms";
import AcceptWorksheet from "./components/AcceptWorksheet/AcceptWorksheet";
import Assignments from "./components/Assignments/Assignments";
import StudentView from "./components/StudentView/StudentView";

function App() {
  const [classroomCode, setClassroomCode] = useState("");

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const createNewUser = async () => {
      let classroomCode = null;
      if (localStorage.getItem("classroomCode")) {
        classroomCode = localStorage.getItem("classroomCode");
        localStorage.removeItem("classroomCode");
      }
      try {
        const token = await getAccessTokenSilently();

        const result = await fetch("http://localhost:8080/auth/create-user", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            classroomToJoin: classroomCode,
          }),
        });
        const resData = await result.json();
        console.log(resData);
        setClassroomCode(resData.classroomCode);
      } catch (err) {
        console.log(err);
      }
    };
    if (isAuthenticated) createNewUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      <Switch>
        {isAuthenticated &&
        user["https://hiddenpicturetest.com/roles"].includes("teacher") ? (
          <Route path="/" exact component={WorksheetCreator} />
        ) : isAuthenticated &&
          !user["https://hiddenpicturetest.com/roles"].includes("teacher") ? (
          <Route path="/" exact component={StudentView} />
        ) : (
          <Route path="/" exact render={(props) => <Welcome />} />
        )}
        <Route
          path="/classroom"
          exact
          render={(props) => <Classroom classroomCode={classroomCode} />}
        />
        <Route path="/classrooms" exact component={Classrooms} />
        <Route path="/assignments" exact component={Assignments} />
        <Route path="/join" exact component={JoinClassroom} />
        <Route
          path="/accept-worksheet/:worksheetId"
          exact
          component={AcceptWorksheet}
        />

        {isAuthenticated &&
        user["https://hiddenpicturetest.com/roles"].includes("teacher") ? (
          <Route
            path="/worksheets"
            exact
            render={(props) => <WorksheetCreator />}
          />
        ) : null}
        {isAuthenticated &&
        !user["https://hiddenpicturetest.com/roles"].includes("teacher") ? (
          <Route path="/worksheets" exact render={(props) => <StudentView />} />
        ) : null}

        <Route path="/:anything" component={Welcome} />
      </Switch>
    </>
  );
}

export default App;
