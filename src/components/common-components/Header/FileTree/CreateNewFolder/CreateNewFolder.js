import * as React from "react";
import classes from "./CreateNewFolder.module.css";
import { IconContext } from "react-icons";
import {
  IoIosAddCircle,
  IoIosRemoveCircle,
  IoIosArrowUp,
} from "react-icons/io";
import { Box, Input, Button } from "@chakra-ui/core";
import axios from "axios";

const CreateNewFolder = ({ selectedFolder, folders, setFolders }) => {
  const [folderInput, setFolderInput] = React.useState("");

  const [newFolderIsOpen, setNewFolderIsOpen] = React.useState(false);

  const createFolderHandler = async () => {
    console.log("clicked");
    try {
      const result = await axios.post("http://localhost:8080/new-folder", {
        data: {
          folderName: folderInput,
          parent: selectedFolder.id,
        },
      });
      console.log(result);
      const updatedFolders = [...folders];
      updatedFolders.push(result.data.folder);
      setFolders(updatedFolders);
      setFolderInput("");
    } catch (err) {
      console.log(err);
    }
  };

  let newFolderClasses = [classes.NewFolder].join(" ");
  if (newFolderIsOpen)
    newFolderClasses = [classes.NewFolder, classes.Active].join(" ");

  return (
    <>
      <div
        onClick={() => setNewFolderIsOpen(!newFolderIsOpen)}
        className={newFolderClasses}
      >
        <IconContext.Provider value={{ size: "1.5rem" }}>
          {!newFolderIsOpen ? (
            <IoIosAddCircle className={classes.NewFolderIcon} />
          ) : (
            <IoIosRemoveCircle className={classes.NewFolderIcon} />
          )}
        </IconContext.Provider>
        New Folder
      </div>
      {newFolderIsOpen ? (
        <Box className={classes.NewFolderBox}>
          <Input
            className={classes.NewFolderInput}
            onChange={(e) => setFolderInput(e.target.value)}
            value={folderInput}
            placeholder="New Folder Name"
          ></Input>
          <Box className={classes.ButtonBox}>
            <IoIosArrowUp className={classes.ArrowUp} />
            <Button
              className={classes.NewFolderButton}
              onClick={createFolderHandler}
            >
              Create Folder
            </Button>
            <IoIosArrowUp className={classes.ArrowUp} />
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default CreateNewFolder;
