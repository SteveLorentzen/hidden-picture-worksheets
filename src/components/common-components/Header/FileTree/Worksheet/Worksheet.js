import * as React from "react";
import classes from "./Worksheet.module.css";
import { AiOutlineFileImage } from "react-icons/ai";

const Worksheet = ({
  openActiveWorksheetHandler,
  setMoved,
  id,
  name,
  newlyCreatedWorksheet,
}) => {
  return (
    <div
      className={classes.WorksheetName}
      onClick={() => openActiveWorksheetHandler(id)}
      onDragStart={() =>
        setMoved({
          type: "worksheet",
          worksheetId: id,
        })
      }
      draggable
    >
      <AiOutlineFileImage />
      {newlyCreatedWorksheet.id === id ? (
        <div className={classes.NewWorksheetBox}>
          <span>{name}</span>
          <span className={classes.NewLabel}>
            <em>New!</em>
          </span>
        </div>
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
};

export default Worksheet;
