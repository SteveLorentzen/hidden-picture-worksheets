import classes from "./CreateNewWorksheet.module.css";
import * as React from "react";
import NewWorksheetDetails from "./NewWorksheetDetails/NewWorksheetDetails";
import { IconContext } from "react-icons";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

const CreateNewWorksheet = ({
  setWorksheetNames,
  worksheetNames,
  selectedFolder,
  setNewlyCreatedWorksheet,
  newlyCreatedWorksheet,
}) => {
  const [newWorksheetIsOpen, setNewWorksheetIsOpen] = React.useState(false);

  let newWorksheetClasses = [classes.NewWorksheet].join(" ");
  if (newWorksheetIsOpen)
    newWorksheetClasses = [classes.NewWorksheet, classes.Active].join(" ");

  return (
    <div>
      {/* <Button
        margin="15px 0"
        variant="outline"
        onClick={openNewWorksheetModalHandler}
      >
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <IoIosAddCircle className={classes.NewWorksheetIcon} />
        </IconContext.Provider>
        New Worksheet
      </Button> */}
      <div
        onClick={() => setNewWorksheetIsOpen(!newWorksheetIsOpen)}
        className={newWorksheetClasses}
      >
        <IconContext.Provider value={{ size: "1.5rem" }}>
          {!newWorksheetIsOpen ? (
            <IoIosAddCircle className={classes.NewWorksheetIcon} />
          ) : (
            <IoIosRemoveCircle className={classes.NewWorksheetIcon} />
          )}
        </IconContext.Provider>
        New Worksheet
      </div>
      {newWorksheetIsOpen ? (
        <NewWorksheetDetails
          closeHandler={() => setNewWorksheetIsOpen(false)}
          setWorksheetNames={setWorksheetNames}
          worksheetNames={worksheetNames}
          selectedFolder={selectedFolder}
          setNewlyCreatedWorksheet={setNewlyCreatedWorksheet}
        />
      ) : null}
    </div>
  );
};

export default CreateNewWorksheet;
