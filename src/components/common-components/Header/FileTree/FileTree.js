import * as React from "react";
import classes from "./FileTree.module.css";
import { Box, Spinner, Heading, Input } from "@chakra-ui/core";
import Worksheet from "./Worksheet/Worksheet";
import Folder from "./Folder/Folder";
import Path from "./Path/Path";
import axios from "axios";
import CreateNewWorksheet from "./CreateNewWorksheet/CreateNewWorksheet";
import CreateNewFolder from "./CreateNewFolder/CreateNewFolder";
import { IoIosCloseCircle, IoIosTrash } from "react-icons/io";
import { IconContext } from "react-icons";

const FileTree = ({
  openNewWorksheetModalHandler,
  setDrawerIsOpen,
  openActiveWorksheetHandler,
  selectedFolder,
  setSelectedFolder,
  activeWorksheet,
  setActiveWorksheet,
  // worksheetMenuIsLoading,
  // worksheetNames,
  // setWorksheetNames,
  // folders,
  // setFolders,
}) => {
  const [worksheetMenuIsLoading, setWorksheetMenuIsLoading] = React.useState(
    false
  );

  const [folders, setFolders] = React.useState([]);

  const [worksheetNames, setWorksheetNames] = React.useState([]);

  const [moved, setMoved] = React.useState({});

  const [trashIsActive, setTrashIsActive] = React.useState(false);

  const [newlyCreatedWorksheet, setNewlyCreatedWorksheet] = React.useState({
    worksheetName: "",
    id: "",
    parent: "",
  });

  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    let mounted = true;
    setWorksheetMenuIsLoading(true);
    const fetchWorksheetsAndFolders = async () => {
      try {
        const result = await axios.get("/worksheets");
        console.log(result);
        if (mounted) {
          setWorksheetNames(result.data.worksheetNames);
          setFolders(result.data.folders);
          setWorksheetMenuIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorksheetsAndFolders();
    return () => (mounted = false);
  }, [setWorksheetNames]);

  const deleteHandler = async () => {
    console.log(moved, selectedFolder);
    if (moved.id === selectedFolder.id) {
      setSelectedFolder({ path: [], id: "" });
    }
    // if (!selectedFolder) {
    //   console.log("no selected folder");
    //   return;
    // }
    let url;
    if (moved.type === "folder") {
      url = "/delete-folder/" + moved.id;
    }
    if (moved.type === "worksheet") {
      url = "/delete-worksheet/" + moved.worksheetId;
    }

    try {
      const result = await axios.delete(url);
      console.log(result);
      // setSelectedFolder("");
      // const updatedFolders = folders.filter((folder) => {
      //   return folder._id !== resData.result._id;
      // });
      if (result.data.folders) {
        setFolders(result.data.folders);
        if (result.data.deletedFolders.includes(selectedFolder.id)) {
          setSelectedFolder({ path: [], id: "" });
        }
      }

      if (result.data.deletedWorksheetId) {
        setWorksheetNames(
          worksheetNames.filter((worksheetName) => {
            console.log(worksheetName._id, result.data.deletedWorksheetId);
            return worksheetName._id !== result.data.deletedWorksheetId;
          })
        );
      }

      // setWorksheetNames(result.data.worksheetNames);
      if (activeWorksheet) {
        console.log(
          result.data.deletedWorksheetId,
          activeWorksheet.worksheetId
        );
        if (result.data.deletedWorksheetId === activeWorksheet.worksheetId) {
          setActiveWorksheet(null);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const allowDropHandler = (event) => {
    event.preventDefault();
    console.log("this is working");
  };

  const acceptMoved = async () => {
    if (!moved.parent) {
      console.log("already root level");
    }
    try {
      const result = await axios.put("/add-to-folder", {
        movedItem: moved,
        targetFolder: null,
      });

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
        const updatedWorksheets = worksheetNames.map((worksheet) => {
          if (worksheet._id === moved.worksheetId) {
            const updatedWorksheet = {
              ...worksheet,
              parent: result.data.updatedWorksheet.parent,
            };
            return updatedWorksheet;
          }
          return worksheet;
        });
        setWorksheetNames(updatedWorksheets);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const leaveHandler = () => {
    console.log("leave");
    setTrashIsActive(false);
  };

  const openHandler = (id) => {
    openActiveWorksheetHandler(id);
    setNewlyCreatedWorksheet({
      worksheetName: "",
      id: "",
    });
    setSearchInput("");
  };

  let searchResults = worksheetNames
    .filter((worksheet) => {
      return worksheet.worksheetName
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    })
    .map((worksheet) => {
      return (
        <Worksheet
          key={worksheet._id}
          id={worksheet._id}
          openActiveWorksheetHandler={openHandler}
          setMoved={setMoved}
          name={worksheet.worksheetName}
          newlyCreatedWorksheet={newlyCreatedWorksheet}
        />
      );
    });

  const searchHandler = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Box className={classes.FileTree}>
      <Box className={classes.MenuHeader}>
        <IconContext.Provider
          value={{ size: "1.5em", className: `${classes.Icons}` }}
        >
          <IoIosCloseCircle
            className={classes.CloseButton}
            onClick={() => setDrawerIsOpen(false)}
          />
        </IconContext.Provider>
        <Heading as="h3" size="xl" className={classes.WorksheetsTitle}>
          Worksheets
        </Heading>
      </Box>

      {/* <hr className={classes.Hr} /> */}
      <Path selectedFolder={selectedFolder} />
      <CreateNewWorksheet
        setWorksheetNames={setWorksheetNames}
        worksheetNames={worksheetNames}
        selectedFolder={selectedFolder}
        newlyCreatedWorksheet={newlyCreatedWorksheet}
        setNewlyCreatedWorksheet={setNewlyCreatedWorksheet}
      />
      <CreateNewFolder
        selectedFolder={selectedFolder}
        folders={folders}
        setFolders={setFolders}
      />
      <Input
        className={classes.Search}
        placeholder="Search"
        value={searchInput}
        onChange={(event) => searchHandler(event)}
      />
      <Box
        className={classes.WorksheetNameBox}
        onClick={() => setSelectedFolder({ path: [], id: "" })}
        onDragOver={(event) => allowDropHandler(event)}
        onDrop={acceptMoved}
      >
        {searchInput.length > 0 ? (
          <Box className={classes.SearchResultsBox}>{searchResults}</Box>
        ) : (
          <Box>
            <div className={classes.WorksheetAndFolderBox}>
              <div className={classes.FolderBox}>
                {folders
                  .filter((folder) => {
                    return !folder.parent;
                  })
                  .map((folder) => {
                    return (
                      <Folder
                        key={folder._id}
                        name={folder.name}
                        id={folder._id}
                        parent={folder.parent}
                        setMoved={setMoved}
                        moved={moved}
                        setSelectedFolder={setSelectedFolder}
                        selectedFolder={selectedFolder}
                        folders={folders}
                        setFolders={setFolders}
                        worksheets={worksheetNames}
                        setWorksheets={setWorksheetNames}
                        openActiveWorksheetHandler={openHandler}
                        folderChain={[]}
                        newlyCreatedWorksheet={newlyCreatedWorksheet}
                      />
                    );
                  })}
              </div>
              <div>
                {worksheetMenuIsLoading ? (
                  <Spinner />
                ) : (
                  worksheetNames.map((worksheet) => {
                    if (!worksheet.parent) {
                      return (
                        <Worksheet
                          key={worksheet._id}
                          id={worksheet._id}
                          openActiveWorksheetHandler={openHandler}
                          setMoved={setMoved}
                          name={worksheet.worksheetName}
                          newlyCreatedWorksheet={newlyCreatedWorksheet}
                        />
                      );
                    }
                    return null;
                  })
                )}
              </div>
            </div>
          </Box>
        )}
      </Box>

      <Box className={classes.ButtonBox}>
        {/* <Button variant="ghost" mr={3} onClick={() => setDrawerIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="outline" onClick={deleteFolderHandler}>
          Delete Selected Folder
        </Button> */}
        <Box
          className={
            trashIsActive
              ? [classes.TrashBox, classes.TrashCanActive].join(" ")
              : classes.TrashBox
          }
          onDragOver={allowDropHandler}
          onDrop={deleteHandler}
          onDragEnter={() => {
            setTrashIsActive(true);
          }}
          onDragLeave={leaveHandler}
        >
          <IconContext.Provider
            value={{ size: "3em", className: `${classes.Icons}` }}
          >
            <IoIosTrash className={classes.TrashCan} />
          </IconContext.Provider>
        </Box>
      </Box>
    </Box>
  );
};

export default FileTree;
