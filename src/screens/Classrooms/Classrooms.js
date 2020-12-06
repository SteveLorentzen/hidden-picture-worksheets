import React, { useState, useEffect } from "react";
import { Button, Box, Input, Heading, Spinner } from "@chakra-ui/core";
import Header from "../../components/Header/Header";
import classes from "./Classrooms.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import ClassroomPreview from "../../components/ClassroomPreview/ClassroomPreview";
import Classroom from "../../components/Classroom/Classroom";
import Modal from "../../components/UI/Modal/Modal";

const Classrooms = () => {
  const [classroomInput, setClassroomInput] = useState({
    name: "",
  });

  const [classrooms, setClassrooms] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState({
    newClassroom: false,
    deleteCheck: false,
    code: false,
  });

  const [activeClassroom, setActiveClassroom] = useState({});

  const { getAccessTokenSilently } = useAuth0();

  const [deleting, setDeleting] = useState(false);

  const [codeToDisplay, setCodeToDisplay] = useState({ code: "", name: "" });

  const [classroomToDeleteId, setClassroomToDeleteId] = useState("");

  useEffect(() => {
    const getClassrooms = async () => {
      try {
        const token = await getAccessTokenSilently();
        const result = await fetch("http://localhost:8080/get-classrooms", {
          headers: {
            Authorization: "bearer " + token,
          },
        });
        const resData = await result.json();
        console.log(resData);
        setClassrooms(resData.classrooms);
      } catch (err) {
        console.log(err);
      }
    };
    getClassrooms();
  }, [getAccessTokenSilently]);

  const inputHandler = (event) => {
    setClassroomInput({
      ...classroomInput,
      [event.target.name]: event.target.value,
    });
  };

  const createClassroomHandler = async () => {
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch("http://localhost:8080/create-classroom", {
        method: "post",
        headers: {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: classroomInput.name,
        }),
      });
      const resData = await result.json();
      console.log(resData);
      const updatedClassrooms = [...classrooms];
      updatedClassrooms.push(resData.classroom);
      setClassrooms(updatedClassrooms);
      setModalIsOpen({ ...modalIsOpen, newClassroom: false });
    } catch (err) {
      console.log(err);
    }
  };

  const openClassroomHandler = (classroom) => {
    setActiveClassroom(classroom);
  };

  const openCodeModalHandler = (event, code, name) => {
    event.stopPropagation();
    setCodeToDisplay({ code, name });
  };

  const deleteCheckHandler = (event, id) => {
    event.stopPropagation();
    setClassroomToDeleteId(id);
  };

  const deleteClassroomHandler = async () => {
    console.log(classroomToDeleteId, activeClassroom._id);
    if (activeClassroom._id === classroomToDeleteId) {
      setActiveClassroom({});
    }
    setDeleting(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await fetch("http://localhost:8080/delete-classroom", {
        method: "delete",
        body: JSON.stringify({
          classroomId: classroomToDeleteId,
        }),
        headers: {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const resData = await result.json();
      console.log(resData);
      setClassrooms(
        classrooms.filter((classroom) => {
          return classroom._id !== resData.classroomId;
        })
      );
    } catch (err) {
      console.log(err);
    }
    setClassroomToDeleteId("");
    setDeleting(false);
  };
  return (
    <>
      <Header isTeacher={true} />

      <Box className={classes.NewClassroomBox}>
        <Button
          onClick={() => setModalIsOpen({ ...modalIsOpen, newClassroom: true })}
          variant="outline"
          variantColor="teal"
        >
          Create New Classroom
        </Button>
      </Box>
      {Object.keys(classrooms).length !== 0 ? (
        <Box className={classes.ClassroomsBox}>
          {classrooms.map((classroom) => {
            return (
              <ClassroomPreview
                key={classroom._id}
                classroomId={classroom._id}
                name={classroom.name}
                students={classroom.students}
                code={classroom.code}
                activeClassroomId={activeClassroom._id}
                openCodeModal={(event) =>
                  openCodeModalHandler(event, classroom.code, classroom.name)
                }
                openClassroomHandler={() => openClassroomHandler(classroom)}
                deleteCheckHandler={(event) =>
                  deleteCheckHandler(event, classroom._id)
                }
              />
            );
          })}
        </Box>
      ) : null}
      <Box className={classes.SpinnerBox}>{deleting ? <Spinner /> : null}</Box>

      {activeClassroom.name ? (
        <Classroom
          classroomName={activeClassroom.name}
          classroomCode={activeClassroom.code}
          classroomId={activeClassroom._id}
        />
      ) : null}
      {classroomToDeleteId !== "" ? (
        <Modal
          closeModalHandler={() => setClassroomToDeleteId("")}
          size="small"
        >
          <Heading as="h1" size="lg">
            Are you sure you want to delete the classroom {}?
          </Heading>

          <Box display="flex" justifyContent="space-evenly">
            <Button variant="ghost" onClick={() => setClassroomToDeleteId("")}>
              Cancel
            </Button>
            <Button
              variant="outline"
              variantColor="teal"
              onClick={() => deleteClassroomHandler()}
            >
              Delete
            </Button>
          </Box>
        </Modal>
      ) : null}
      {modalIsOpen.newClassroom ? (
        <Modal
          closeModalHandler={() =>
            setModalIsOpen({ ...modalIsOpen, newClassroom: false })
          }
          size="small"
        >
          <Heading as="h1" size="lg">
            Create New Classroom
          </Heading>
          <Input
            name="name"
            placeholder="Classroom Name"
            onChange={inputHandler}
            margin="20px 0"
            minHeight="40px"
          />
          <Box display="flex" justifyContent="space-evenly">
            <Button
              variant="ghost"
              onClick={() =>
                setModalIsOpen({ ...modalIsOpen, newClassroom: false })
              }
            >
              Cancel
            </Button>

            <Button
              variant="outline"
              variantColor="teal"
              onClick={createClassroomHandler}
            >
              Create
            </Button>
          </Box>
        </Modal>
      ) : null}
      {codeToDisplay.code !== "" ? (
        <Modal
          closeModalHandler={() => setCodeToDisplay({ code: "", name: "" })}
          size="small"
        >
          <Box className={classes.CodeBox}>
            <Heading as="h1" size="md">
              Classroom Code for {codeToDisplay.name}:
            </Heading>
            <h2 className={classes.Code}>{codeToDisplay.code}</h2>
            <Button
              variant="outline"
              variantColor="teal"
              onClick={() => setCodeToDisplay({ code: "", name: "" })}
            >
              Close
            </Button>
          </Box>
        </Modal>
      ) : null}
    </>
  );
};

export default Classrooms;
