import React from "react";
import classes from "./ActiveStudentWorksheet.module.css";

const ActiveStudentWorksheet = ({
  questionAnswers,
  mainImageUrl,
  panelImageUrl,
  children,
}) => {
  console.log(mainImageUrl, panelImageUrl);
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
        {Object.keys(questionAnswers).map((key) => {
          return (
            <div
              style={{
                backgroundImage: `url('${panelImageUrl}')`,
                backgroundSize: "cover",
                width:
                  100 / Math.sqrt(Object.keys(questionAnswers).length) + "%",
                height:
                  100 / Math.sqrt(Object.keys(questionAnswers).length) + "%",
              }}
              key={key}
              className={
                questionAnswers[key].showPanel
                  ? classes.ShowPanel
                  : classes.HidePanel
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveStudentWorksheet;
