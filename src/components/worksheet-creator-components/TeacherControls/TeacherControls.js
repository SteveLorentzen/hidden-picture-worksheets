import React, { useState } from "react";
import { Box } from "@chakra-ui/core";
import { IoIosTrash, IoIosColorWand, IoIosConstruct } from "react-icons/io";
import {
  AiOutlineUsergroupAdd,
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiFillSave,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import classes from "./TeacherControls.module.css";

const TeacherControls = ({
  controlsAreOpen,
  setEditorIsOpen,
  editorIsOpen,
  deleteWorksheetModal,
  editWorksheetModal,
  updateWorksheetHandler,
  openNewWorksheetModal,
  openQuestionGeneratorModal,
  openShareWorksheetModal,
}) => {
  const [descriptionModal, setDescriptionModal] = useState("");

  let descriptionTimeout;

  const descriptionTimeoutHandler = (iconDescription) =>
    (descriptionTimeout = setTimeout(() => {
      setDescriptionModal(iconDescription);
    }, 1500));

  const clearDescriptionHandler = () => {
    clearTimeout(descriptionTimeout);
    setDescriptionModal("");
  };

  return (
    <>
      {controlsAreOpen ? (
        <Box className={classes.TeacherControls}>
          <IconContext.Provider
            value={{ size: "3em", className: `${classes.Icons}` }}
          >
            <Box className={classes.QuestionAnswerIcons}>
              {editorIsOpen ? (
                <div>
                  <AiOutlineEdit
                    className={[classes.Icons, classes.Active].join(" ")}
                    onClick={setEditorIsOpen}
                    onMouseEnter={() => {
                      descriptionTimeoutHandler("Close Editor");
                    }}
                    onMouseLeave={clearDescriptionHandler}
                    onMouseDown={clearDescriptionHandler}
                  />
                  {descriptionModal === "Close Editor" ? (
                    <div className={classes.Description}>
                      {descriptionModal}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>
                  <AiOutlineEdit
                    className={classes.Icons}
                    onClick={setEditorIsOpen}
                    onMouseEnter={() => {
                      descriptionTimeoutHandler("Open Editor");
                    }}
                    onMouseLeave={clearDescriptionHandler}
                    onMouseDown={clearDescriptionHandler}
                  />
                  {descriptionModal === "Open Editor" ? (
                    <div className={classes.Description}>
                      {descriptionModal}
                    </div>
                  ) : null}
                </div>
              )}

              <div>
                <IoIosColorWand
                  className={classes.Icons}
                  onClick={openQuestionGeneratorModal}
                  onMouseEnter={() => {
                    descriptionTimeoutHandler("Question Wizard");
                  }}
                  onMouseLeave={clearDescriptionHandler}
                  onMouseDown={clearDescriptionHandler}
                />
                {descriptionModal === "Question Wizard" ? (
                  <div className={classes.Description}>{descriptionModal}</div>
                ) : null}
              </div>

              <div>
                <AiFillSave
                  className={classes.Icons}
                  onClick={updateWorksheetHandler}
                  onMouseEnter={() => {
                    descriptionTimeoutHandler("Save Worksheet");
                  }}
                  onMouseLeave={clearDescriptionHandler}
                  onMouseDown={clearDescriptionHandler}
                />
                {descriptionModal === "Save Worksheet" ? (
                  <div className={classes.Description}>{descriptionModal}</div>
                ) : null}
              </div>
            </Box>

            <Box className={classes.NewWorksheetIcon}>
              <AiOutlineShareAlt
                className={classes.Icons}
                onClick={openShareWorksheetModal}
                onMouseEnter={() => {
                  descriptionTimeoutHandler("Share Worksheet");
                }}
                onMouseLeave={clearDescriptionHandler}
                onMouseDown={clearDescriptionHandler}
              />
              {descriptionModal === "Share Worksheet" ? (
                <div className={classes.Description}>{descriptionModal}</div>
              ) : null}

              <AiOutlineUsergroupAdd
                className={classes.Icons}
                // set up on click for assign modal
                onMouseEnter={() => {
                  descriptionTimeoutHandler("Assign Worksheet");
                }}
                onMouseLeave={clearDescriptionHandler}
                onMouseDown={clearDescriptionHandler}
              />
              {descriptionModal === "Assign Worksheet" ? (
                <div className={classes.Description}>{descriptionModal}</div>
              ) : null}
            </Box>
            <Box className={classes.EditDeleteWorksheetIcons}>
              <div>
                <IoIosConstruct
                  className={classes.Icons}
                  onClick={editWorksheetModal}
                  onMouseEnter={() => {
                    descriptionTimeoutHandler("Worksheet Settings");
                  }}
                  onMouseLeave={clearDescriptionHandler}
                  onMouseDown={clearDescriptionHandler}
                />
                {descriptionModal === "Worksheet Settings" ? (
                  <div className={classes.Description}>{descriptionModal}</div>
                ) : null}
              </div>
              <div>
                <IoIosTrash
                  className={classes.Icons}
                  onClick={deleteWorksheetModal}
                  onMouseEnter={() => {
                    descriptionTimeoutHandler("Delete Worksheet");
                  }}
                  onMouseLeave={clearDescriptionHandler}
                  onMouseDown={clearDescriptionHandler}
                />
                {descriptionModal === "Delete Worksheet" ? (
                  <div className={classes.Description}>{descriptionModal}</div>
                ) : null}
              </div>
            </Box>
          </IconContext.Provider>
        </Box>
      ) : null}
    </>
  );
};

export default TeacherControls;
