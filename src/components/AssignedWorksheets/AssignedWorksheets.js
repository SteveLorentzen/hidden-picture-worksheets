import React from "react";
import AssignedWorksheet from "../AssignedWorksheet/AssignedWorksheet";

const AssignedWorksheets = ({ assignedWorksheets, openWorksheetHandler }) => {
  return (
    <>
      {assignedWorksheets.map((assignedWorksheet) => {
        return (
          <AssignedWorksheet
            key={assignedWorksheet._id}
            worksheetName={assignedWorksheet.worksheet.worksheetName}
            dueDate={assignedWorksheet.dueDate}
            openWorksheetHandler={() => openWorksheetHandler(assignedWorksheet)}
          />
        );
      })}
    </>
  );
};
export default AssignedWorksheets;
