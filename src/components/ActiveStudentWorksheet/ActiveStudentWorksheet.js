import React from "react";
import classes from "./ActiveStudentWorksheet.module.css";
import { Box } from "@chakra-ui/core";
import StudentQuestionAnswer from "../StudentQuestionAnswer/StudentQuestionAnswer";

const ActiveStudentWorksheet = ({
  activeQuestionAnswers,
  changeAnswerHandler,
  showPanels,
  mainImageUrl,
  panelImageUrl,
  studentAnswers,
}) => {
  return (
    <div className={classes.WorksheetContainer}>
      <div className={classes.QuestionAnswerContainer}>
        {Object.keys(activeQuestionAnswers).map(
          (activeQuestionAnswerKey, index) => {
            return (
              <div key={activeQuestionAnswerKey}>
                <StudentQuestionAnswer
                  activeQuestionAnswer={
                    activeQuestionAnswers[activeQuestionAnswerKey]
                  }
                  changeAnswerHandler={changeAnswerHandler}
                  activeQuestionAnswerKey={activeQuestionAnswerKey}
                  studentAnswer={studentAnswers[activeQuestionAnswerKey]}
                />
              </div>
            );
          }
        )}
      </div>
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
