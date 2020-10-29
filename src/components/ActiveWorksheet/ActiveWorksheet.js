import React from 'react';
import classes from './ActiveWorksheet.module.css';
import QuestionAnswer from '../QuestionAnswer/QuestionAnswer'

const ActiveWorksheet = ({ activeQuestionAnswers, editorIsOpen, changeQuestionAnswerHandler, showPanels, mainImageUrl, panelImageUrl }) => {
    return (
        <div className={classes.WorksheetContainer}>
            <div className={classes.QuestionAnswerContainer}>
                {Object.keys(activeQuestionAnswers).map((activeQuestionAnswerKey, index) => {
                    return (
                        <div key={activeQuestionAnswerKey} >
                            <QuestionAnswer
                                activeQuestionAnswer={activeQuestionAnswers[activeQuestionAnswerKey]}
                                changeQuestionAnswerHandler={changeQuestionAnswerHandler}
                                activeQuestionAnswerKey={activeQuestionAnswerKey}
                                editorIsOpen={editorIsOpen} />
                        </div>
                    )
                })}
            </div>
            <div style={{
                backgroundImage: `url('${mainImageUrl}')`,
                backgroundSize: 'cover',
            }} className={classes.PictureContainer}>
                {Object.keys(showPanels).map(panelKey => {
                    return (
                        <div style={{
                            backgroundImage: `url('${panelImageUrl}')`,
                            backgroundSize: 'cover',
                            width: 100 / Math.sqrt(Object.keys(showPanels).length) + "%",
                            height: 100 / Math.sqrt(Object.keys(showPanels).length) + "%",
                        }} key={panelKey} className={showPanels[panelKey] ? classes.ShowPanel : classes.HidePanel}></div>
                    )
                })}
            </div>
        </div >
    )
}

export default ActiveWorksheet;