import React from "react";
import classes from "./ActiveStudentWorksheet.module.css";

const ActiveStudentWorksheet = ({
  activeQuestionAnswers,
  changeAnswerHandler,
  showPanels,
  mainImageUrl,
  panelImageUrl,
  studentAnswers,
  children,
}) => {
  return (
    <div className={classes.WorksheetContainer}>
      <div className={classes.QuestionAnswerContainer}>{children}</div>
      <div
        style={{
          backgroundImage: `url('${mainImageUrl}')`,
          backgroundSize: "cover",
        }}
        className={classes.PictureContainer}
      >
        {Object.keys(showPanels).map((panelKey) => {
          return (
            <div
              style={{
                backgroundImage: `url('${panelImageUrl}')`,
                backgroundSize: "cover",
                width: 100 / Math.sqrt(Object.keys(showPanels).length) + "%",
                height: 100 / Math.sqrt(Object.keys(showPanels).length) + "%",
              }}
              key={panelKey}
              className={
                showPanels[panelKey] ? classes.ShowPanel : classes.HidePanel
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveStudentWorksheet;
