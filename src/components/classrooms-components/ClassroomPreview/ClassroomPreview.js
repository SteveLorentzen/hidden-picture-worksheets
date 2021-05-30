import React from "react";
import { Box, Heading, Button } from "@chakra-ui/core";
import classes from "./ClassroomPreview.module.css";
import { IoIosTrash } from "react-icons/io";
import { IconContext } from "react-icons";

const ClassroomPreview = ({
  classroomId,
  name,
  openClassroomHandler,
  deleteCheckHandler,
  openCodeModal,
  activeClassroomId,
  code,
}) => {
  let classroomClasses = [classes.Classroom];

  if (classroomId === activeClassroomId) {
    classroomClasses = [classes.Classroom, classes.ActiveClassroom];
  }
  return (
    <Box
      className={classroomClasses.join(" ")}
      onClick={(event) => openClassroomHandler(event)}
    >
      <Heading
        className={classes.ClassroomName}
        as="h1"
        size="md"
        overflowWrap="anywhere"
      >
        {name}
      </Heading>
      <Box className={classes.IconBox}>
        <Button className={classes.CodeButton} onClick={openCodeModal}>
          code: {code}
        </Button>

        <IconContext.Provider
          value={{ size: "1.8em", className: `${classes.Icons}` }}
        >
          <IoIosTrash onClick={deleteCheckHandler} />
        </IconContext.Provider>
      </Box>
    </Box>
  );
};

export default ClassroomPreview;
