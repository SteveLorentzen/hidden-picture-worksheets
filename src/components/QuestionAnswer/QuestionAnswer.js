import classes from './QuestionAnswer.module.css';
import React from 'react';

const QuestionAnswer = ({ activeQuestionAnswerKey, activeQuestionAnswer, changeQuestionAnswerHandler, editorIsOpen }) => {

    return (
        <div className={classes.QuestionAnswer}>
            {editorIsOpen ? <input className={classes.QuestionInput} type='text' value={activeQuestionAnswer.question} onChange={(event) => changeQuestionAnswerHandler(event, activeQuestionAnswerKey, 'question')} />
                : <p className={classes.Question}>{activeQuestionAnswer.question}</p>}

            {
                editorIsOpen ?
                    <input className={classes.Answer} type='text' value={activeQuestionAnswer.answerKey} onChange={(event) => changeQuestionAnswerHandler(event, activeQuestionAnswerKey, 'answerKey')} /> :
                    <input className={classes.Answer} type='text' value={activeQuestionAnswer.answer} onChange={(event) => changeQuestionAnswerHandler(event, activeQuestionAnswerKey, 'answer')} />
            }
        </div >
    )
}

export default QuestionAnswer;