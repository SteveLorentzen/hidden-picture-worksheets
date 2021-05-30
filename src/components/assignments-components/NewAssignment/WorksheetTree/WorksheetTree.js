import * as React from "react";
import classes from "./WorksheetTree.module.css";
import SelectionFolder from "./SelectionFolder/SelectionFolder";
import SelectionWorksheet from "./SelectionWorksheet/SelectionWorksheet";
import { Box, Spinner } from "@chakra-ui/core";

const WorksheetTree = ({
  worksheetMenuIsLoading,
  folders,
  worksheets,
  newAssignmentInput,
  setNewAssignmentInput,
  selectedWorksheet,
  setSelectedWorksheet,
}) => {
  const [selectedFolder, setSelectedFolder] = React.useState("");

  // fetch folders
  // fetch worksheets

  const worksheetHandler = (id, name) => {
    setNewAssignmentInput({
      ...newAssignmentInput,
      worksheet: id,
    });
    setSelectedWorksheet({ worksheetName: name, id });
  };

  return (
    <Box>
      <div className={classes.WorksheetAndFolderBox}>
        <div className={classes.FolderBox}>
          {folders
            .filter((folder) => {
              return !folder.parent;
            })
            .map((folder) => {
              return (
                <SelectionFolder
                  key={folder._id}
                  name={folder.name}
                  id={folder._id}
                  parent={folder.parent}
                  setSelectedFolder={setSelectedFolder}
                  selectedFolder={selectedFolder}
                  folders={folders}
                  worksheets={worksheets}
                  worksheetHandler={worksheetHandler}
                  selectedWorksheet={selectedWorksheet}
                  //   folderChain={[]}
                />
              );
            })}
        </div>
        <div>
          {worksheetMenuIsLoading ? (
            <Spinner />
          ) : (
            worksheets.map((worksheet) => {
              if (!worksheet.parent) {
                return (
                  <SelectionWorksheet
                    key={worksheet._id}
                    id={worksheet._id}
                    worksheetHandler={worksheetHandler}
                    name={worksheet.worksheetName}
                    selectedWorksheet={selectedWorksheet}
                  />
                );
              }
              return null;
            })
          )}
        </div>
      </div>
    </Box>
  );
};

export default WorksheetTree;
