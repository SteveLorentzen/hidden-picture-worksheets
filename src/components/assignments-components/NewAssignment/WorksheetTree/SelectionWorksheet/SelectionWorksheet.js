import * as React from "react";
import classes from "./SelectionWorksheet.module.css";
import { AiOutlineFileImage } from "react-icons/ai";

const SelectionWorksheet = ({
  worksheetHandler,
  id,
  name,
  selectedWorksheet,
}) => {
  let worksheetClasses = classes.WorksheetName;

  if (id === selectedWorksheet.id) {
    worksheetClasses = [classes.WorksheetName, classes.Selected].join(" ");
  }

  return (
    <div
      className={worksheetClasses}
      onClick={() => worksheetHandler(id, name)}
    >
      <AiOutlineFileImage />
      {name}
    </div>
  );
};

export default SelectionWorksheet;
