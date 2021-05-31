import * as React from "react";
import classes from "./Folder.module.css";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import Worksheet from "../Worksheet/Worksheet";
import axios from "axios";

const Folder = ({
  name,
  id,
  parent,
  setMoved,
  moved,
  setSelectedFolder,
  selectedFolder,
  folders,
  setFolders,
  worksheets,
  setWorksheets,
  openActiveWorksheetHandler,
  folderChain,
  newlyCreatedWorksheet,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useState(() => {
    if (newlyCreatedWorksheet.parent === id) {
      setIsOpen(true);
    }
  }, [newlyCreatedWorksheet, id]);

  //This array keeps track of the parent folders.
  //This is used to make sure parent folders aren't moved into their own child folders.
  const folderChainArray = [...folderChain];
  folderChainArray.push({ id, name });

  const openFolderHandler = async (event) => {
    event.stopPropagation();
    setSelectedFolder({ id, path: folderChainArray });
    setIsOpen(!isOpen);
  };

  const beginMoveHandler = () => {
    console.log(id, parent);
    setMoved({ type: "folder", id, parent });
  };

  const acceptMoved = async (event) => {
    event.stopPropagation();
    if (moved.id === id) {
      console.log("cannot move into self");
      return;
    }

    let destinationIsChild = false;

    folderChainArray.forEach((parentFolder) => {
      if (parentFolder.id === moved.id) {
        destinationIsChild = true;
      }
    });

    if (destinationIsChild) {
      console.log("you can't move a parent folder into its own child");
      return;
    }

    if (moved.parent === id) {
      console.log("did not move");
      return;
    }

    try {
      const result = await axios.put(
        "https://hidden-picture-worksheets-api.herokuapp.com/add-to-folder",
        {
          movedItem: moved,
          targetFolder: id,
        }
      );

      if (moved.type === "folder") {
        const updatedFolders = folders.map((folder) => {
          if (folder._id === moved.id) {
            const updatedFolder = {
              ...folder,
              parent: result.data.updatedFolder.parent,
            };
            return updatedFolder;
          }
          return folder;
        });
        setFolders(updatedFolders);
      }

      if (moved.type === "worksheet") {
        const updatedWorksheets = worksheets.map((worksheet) => {
          if (worksheet._id === moved.worksheetId) {
            const updatedWorksheet = {
              ...worksheet,
              parent: result.data.updatedWorksheet.parent,
            };
            return updatedWorksheet;
          }
          return worksheet;
        });
        setWorksheets(updatedWorksheets);
      }

      setIsOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const allowDropHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={isOpen ? classes.Folder : null} key={id}>
      <div
        onClick={(event) => openFolderHandler(event)}
        className={
          selectedFolder.id === id
            ? [classes.FolderName, classes.SelectedFolder].join(" ")
            : classes.FolderName
        }
        onDragStart={beginMoveHandler}
        onDragOver={(event) => {
          allowDropHandler(event);
        }}
        onDrop={(event) => acceptMoved(event)}
        draggable
      >
        {isOpen ? <AiFillFolderOpen /> : <AiFillFolder />}
        <div className={classes.FolderLabel}>{name}</div>
      </div>

      <div className={classes.FolderContents}>
        {isOpen
          ? folders
              .filter((folder) => {
                return id === folder.parent;
              })
              .map((folder) => {
                return (
                  <Folder
                    key={folder.id}
                    name={folder.name}
                    id={folder._id}
                    setMoved={setMoved}
                    moved={moved}
                    setSelectedFolder={setSelectedFolder}
                    parent={folder.parent}
                    folders={folders}
                    setFolders={setFolders}
                    worksheets={worksheets}
                    setWorksheets={setWorksheets}
                    openActiveWorksheetHandler={openActiveWorksheetHandler}
                    folderChain={folderChainArray}
                    selectedFolder={selectedFolder}
                    newlyCreatedWorksheet={newlyCreatedWorksheet}
                  />
                );
              })
          : null}
        {isOpen
          ? worksheets
              .filter((worksheet) => {
                return worksheet.parent === id;
              })
              .map((worksheet) => {
                return (
                  <Worksheet
                    key={worksheet._id}
                    id={worksheet._id}
                    name={worksheet.worksheetName}
                    setMoved={setMoved}
                    openActiveWorksheetHandler={openActiveWorksheetHandler}
                    newlyCreatedWorksheet={newlyCreatedWorksheet}
                  />
                );
              })
          : null}
      </div>
    </div>
  );
};

export default Folder;
