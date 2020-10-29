import React, { useState } from 'react';

const QuestionGenerator = ({ closeModalHandler, panelNumber, setActiveQuestionAnswers, activeQuestionAnswers }) => {
    const [questionRangeLower, setQuestionRangeLower] = useState(1);

    const [questionRangeUpper, setQuestionRangeUpper] = useState(null);

    const [operand1Lower, setOperand1Lower] = useState(null);

    const [operand1Upper, setOperand1Upper] = useState(null);

    const [operand2Lower, setOperand2Lower] = useState(null);

    const [operand2Upper, setOperand2Upper] = useState(null);

    const [operator, setOperator] = useState('addition');

    const [addThirdNumber, setAddThirdNumber] = useState(false);

    let panelArray = [];

    for (let i = 1; i <= panelNumber; i++) {
        panelArray.push(i);
    }

    const questionGeneratorHandler = (questionLower, questionUpper, operand1Low, operand1Up, op, operand2Low, operand2Up) => {
        console.log(questionLower, questionUpper, operand1Low, operand1Up, op, operand2Low, operand2Up);
        const updatedQuestionAnswers = {
            ...activeQuestionAnswers,
        }
        const operand1Range = operand1Up - operand1Low + 1;
        const operand2Range = operand2Up - operand2Low + 1;
        switch (op) {
            case 'addition':
                for (let i = questionLower; i <= questionUpper; i++) {
                    const operand1 = Math.floor(Math.random() * operand1Range) + operand1Low;
                    const operand2 = Math.floor(Math.random() * operand2Range) + operand2Low;
                    updatedQuestionAnswers['question' + i] = {
                        question: `${operand1} + ${operand2} =`,
                        answer: "",
                        answerKey: (operand1 + operand2).toString(),
                        showPanel: false,
                    }
                }
                break;
            case 'subtraction':
                for (let i = questionLower; i <= questionUpper; i++) {
                    const operand1 = Math.floor(Math.random() * operand1Range) + operand1Low;
                    const operand2 = Math.floor(Math.random() * operand2Range) + operand2Low;
                    updatedQuestionAnswers['question' + i] = {
                        question: `${operand1} - ${operand2} =`,
                        answer: "",
                        answerKey: (operand1 - operand2).toString(),
                        showPanel: false,
                    }
                }
                break;
            case 'multiplication':
                for (let i = questionLower; i <= questionUpper; i++) {
                    const operand1 = Math.floor(Math.random() * operand1Range) + operand1Low;
                    const operand2 = Math.floor(Math.random() * operand2Range) + operand2Low;
                    updatedQuestionAnswers['question' + i] = {
                        question: `${operand1} x ${operand2} =`,
                        answer: "",
                        answerKey: (operand1 * operand2).toString(),
                        showPanel: false,
                    }
                }
                break;
            case 'division':
                for (let i = questionLower; i <= questionUpper; i++) {
                    const operand1 = Math.floor(Math.random() * operand1Range) + operand1Low;
                    const operand2 = Math.floor(Math.random() * operand2Range) + operand2Low;
                    updatedQuestionAnswers['question' + i] = {
                        question: `${operand1} / ${operand2} =`,
                        answer: "",
                        answerKey: (operand1 / operand2).toString(),
                        showPanel: false,
                    }
                }
                break;
            case 'exponent':
                for (let i = questionLower; i <= questionUpper; i++) {
                    const operand1 = Math.floor(Math.random() * operand1Range) + operand1Low;
                    const operand2 = Math.floor(Math.random() * operand2Range) + operand2Low;
                    updatedQuestionAnswers['question' + i] = {
                        question: `${operand1} to the power of ${operand2} =`,
                        answer: "",
                        answerKey: (Math.pow(operand1, operand2)).toString(),
                        showPanel: false,
                    }
                }
                break;
            default:
                return;
        }
        setActiveQuestionAnswers(updatedQuestionAnswers);
        console.log(updatedQuestionAnswers);
        closeModalHandler();
    }

    return (
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Question Range:</h2>
                    <h4>from</h4>
                    <select type='number' onChange={(event) => setQuestionRangeLower(+event.target.value)}>
                        {panelArray.map(number => {
                            return <option value={number} key={number}>{number}</option>
                        })}
                    </select>
                    <h4>to</h4>
                    <select type='number' onChange={(event) => setQuestionRangeUpper(+event.target.value)}>
                        {panelArray.map(number => {
                            return <option value={number} key={number}>{number}</option>
                        })}
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>First number:</h2>
                    <h4> a random number between</h4>
                    <input type='number' placeholder='Enter low limit' onChange={event => setOperand1Lower(+event.target.value)}></input>
                    <h4>and</h4>
                    <input type='number' placeholder='Enter high limit' onChange={event => setOperand1Upper(+event.target.value)} ></input>
                </div>

                <h2>Operation</h2>
                <select name='operator' onChange={(event) => setOperator(event.target.value)}>

                    <option value='addition'>Addition</option>
                    <option value='subtraction'>Subtraction</option>
                    <option value='multiplication'>Multiplication</option>
                    <option value='division'>Division</option>
                    <option value='exponent'>Exponent</option>
                </select>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Second number:</h2>
                    <h4> a random number between</h4>
                    <input type='number' placeholder='Enter low limit' onChange={event => setOperand2Lower(+event.target.value)}></input>
                    <h4>and</h4>
                    <input type='number' placeholder='Enter high limit' onChange={event => setOperand2Upper(+event.target.value)}></input>
                </div>

                {operator === 'subtraction' ? <input type='checkbox' name='allow-negatives' value="allow negatives"></input> : null}

                {addThirdNumber ?
                    <>

                        <select name='operator' onChange={(event) => setOperator(event.target.value)}>
                            <h2>Operation:</h2>
                            <option value='addition'>Addition</option>
                            <option value='subtraction'>Subtraction</option>
                            <option value='multiplication'>Multiplication</option>
                            <option value='division'>Division</option>
                            <option value='exponent'>Exponent</option>
                        </select>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>Second number:</h2>
                            <h4> a random number between</h4>
                            <input type='number' placeholder='Enter low limit' onChange={event => setOperand2Lower(+event.target.value)}></input>
                            <h4>and</h4>
                            <input type='number' placeholder='Enter high limit' onChange={event => setOperand2Upper(+event.target.value)}></input>
                        </div>
                    </> : null}

            </div>
            <button onClick={() => questionGeneratorHandler(questionRangeLower, questionRangeUpper, operand1Lower, operand1Upper, operator, operand2Lower, operand2Upper)}>Generate Questions!</button>
            <button onClick={() => setAddThirdNumber(!addThirdNumber)}>{!addThirdNumber ? 'Add Third Number' : 'Remove third number'}</button>
        </div>
    )
}

export default QuestionGenerator;