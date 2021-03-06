import * as React from "react";
import classes from "./SelectionFolder.module.css";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import SelectionWorksheet from "../SelectionWorksheet/SelectionWorksheet";

const SelectionFolder = ({
  name,
  id,
  parent,
  setSelectedFolder,
  selectedFolder,
  folders,
  worksheets,
  worksheetHandler,
  selectedWorksheet,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openFolderHandler = async (event) => {
    event.stopPropagation();
    setSelectedFolder(id);
    setIsOpen(!isOpen);
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
                  <SelectionFolder
                    key={folder.id}
                    name={folder.name}
                    id={folder._id}
                    parent={folder.parent}
                    folders={folders}
                    worksheets={worksheets}
                    worksheetHandler={worksheetHandler}
                    selectedFolder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                    selectedWorksheet={selectedWorksheet}
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
                  <SelectionWorksheet
                    key={worksheet._id}
                    id={worksheet._id}
                    name={worksheet.worksheetName}
                    worksheetHandler={worksheetHandler}
                    selectedWorksheet={selectedWorksheet}
                  />
                );
              })
          : null}
      </div>
    </div>
  );
};

export default SelectionFolder;
