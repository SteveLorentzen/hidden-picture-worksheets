import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import WorksheetCreator from "./screens/WorksheetCreator/WorksheetCreator";
import Classroom from "./components/Classroom/Classroom";
import JoinClassroom from "./components/JoinClassroom/JoinClassroom";
import { useAuth0 } from "@auth0/auth0-react";
import Classrooms from "./screens/Classrooms/Classrooms";
import AcceptWorksheet from "./components/AcceptWorksheet/AcceptWorksheet";
import Assignments from "./screens/Assignments/Assignments";
import StudentAssignments from "./screens/StudentAssignments/StudentAssignments";
import StudentWorksheet from "./screens/StudentWorksheet/StudentWorksheet";

function App() {
  const [classroomCode, setClassroomCode] = useState("");

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  let isTeacher = false;

  if (user) {
    isTeacher = user["https://hiddenpicturetest.com/roles"].includes("teacher");
  }

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
      {isAuthenticated && isTeacher ? (
        <Switch>
          <Route path="/" exact component={WorksheetCreator} />
          <Route path="/classrooms" component={Classrooms} />
          <Route path="/assignments" component={Assignments} />
          <Route
            path="/worksheets"
            exact
            render={(props) => <WorksheetCreator />}
          />
        </Switch>
      ) : isAuthenticated && !isTeacher ? (
        <Switch>
          <Route path="/" exact component={StudentAssignments} />
          <Route
            path="/student-worksheet/:assignmentId"
            component={StudentWorksheet}
          />
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/classroom"
            render={(props) => <Classroom classroomCode={classroomCode} />}
          />
          <Route path="/join" component={JoinClassroom} />
          <Route
            path="/accept-worksheet/:worksheetId"
            component={AcceptWorksheet}
          />
          <Route path="/:anything" component={Welcome} />
          <Route path="/" render={(props) => <Welcome />} />
        </Switch>
      )}
    </>
  );
}

export default App;
