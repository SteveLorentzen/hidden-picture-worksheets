import React, {useEffect, useState, createContext} from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import Welcome from "./screens/Welcome/Welcome";
import WorksheetCreator from "./screens/WorksheetCreator/WorksheetCreator";
// import Classroom from "./components/classrooms-components/Classroom/Classroom";
import JoinClassroom from "./screens/JoinClassroom/JoinClassroom";
import {useAuth0} from "@auth0/auth0-react";
import Classrooms from "./screens/Classrooms/Classrooms";
import AcceptWorksheet from "./components/AcceptWorksheet/AcceptWorksheet";
import Assignments from "./screens/Assignments/Assignments";
import StudentAssignments from "./screens/StudentAssignments/StudentAssignments";
import StudentWorksheet from "./screens/StudentWorksheet/StudentWorksheet";
import TeacherOrStudent from "./screens/TeacherOrStudent/TeacherOrStudent";
import axios from "axios";

export const AuthContext = createContext();

function App() {
  // const [classroomCode, setClassroomCode] = useState("");

  const [token, setToken] = useState("");

  const [userId, setUserId] = useState("");

  const {isAuthenticated, getAccessTokenSilently, user} = useAuth0();

  axios.defaults.baseURL =
    "https://hidden-picture-worksheets-api.herokuapp.com/";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["userId"] = userId;

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
        setToken(token);

        const result = await fetch(
          "https://hidden-picture-worksheets-api.herokuapp.com/auth/create-user",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              classroomToJoin: classroomCode,
            }),
          }
        );
        const resData = await result.json();
        console.log(resData);
        // setClassroomCode(resData.classroomCode);
        setUserId(resData.userId);
      } catch (err) {
        console.log(err);
      }
    };
    if (isAuthenticated) createNewUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      <AuthContext.Provider value={{token, userId}}>
        {isAuthenticated && isTeacher && token && userId ? (
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
        ) : isAuthenticated && !isTeacher && token && userId ? (
          <Switch>
            <Route path="/" exact component={StudentAssignments} />
            <Route
              path="/student-worksheet/:assignmentId"
              component={StudentWorksheet}
            />
          </Switch>
        ) : (
          <Switch>
            {/* <Route
              path="/classroom"
              render={(props) => <Classroom classroomCode={classroomCode} />}
            /> */}
            <Route path="/join" component={JoinClassroom} />
            <Route path="/teacher-or-student" component={TeacherOrStudent} />
            <Route
              path="/accept-worksheet/:worksheetId"
              component={AcceptWorksheet}
            />
            <Route path="/:anything" component={Welcome} />
            <Route path="/" render={(props) => <Welcome />} />
          </Switch>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
