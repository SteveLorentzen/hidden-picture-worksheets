import React, { useState } from "react";
import { Input, Heading, Select, Box, Button } from "@chakra-ui/core";
import classes from "./QuestionWizard.module.css";
import { questionWizardDetectErrors } from "../../../util/errors";

const QuestionWizard = ({
  setTimedMessage,
  closeModalHandler,
  panelNumber,
  setActiveQuestionAnswers,
  activeQuestionAnswers,
}) => {
  const [questionRangeLower, setQuestionRangeLower] = useState(1);

  const [questionRangeUpper, setQuestionRangeUpper] = useState(1);

  const [operand1Lower, setOperand1Lower] = useState(null);

  const [operand1Upper, setOperand1Upper] = useState(null);

  const [operand2Lower, setOperand2Lower] = useState(null);

  const [operand2Upper, setOperand2Upper] = useState(null);

  const [operator, setOperator] = useState("addition");

  const [options, setOptions] = useState({
    subtraction: { allowNegatives: false },
  });

  //   const [addThirdNumber, setAddThirdNumber] = useState(false);

  const [errorMessages, setErrorMessages] = useState([]);

  let panelArray = [];

  for (let i = 1; i <= panelNumber; i++) {
    panelArray.push(i);
  }

  const questionWizardHandler = (
    questionLower,
    questionUpper,
    operand1Low,
    operand1Up,
    op,
    operand2Low,
    operand2Up
  ) => {
    console.log(
      questionLower,
      questionUpper,
      operand1Low,
      operand1Up,
      op,
      operand2Low,
      operand2Up
    );
    const errorMessagesArray = questionWizardDetectErrors(
      questionLower,
      questionUpper,
      operand1Low,
      operand1Up,
      op,
      operand2Low,
      operand2Up
    );
    if (errorMessagesArray.length > 0) {
      return setErrorMessages(errorMessagesArray);
    }
    const updatedQuestionAnswers = {
      ...activeQuestionAnswers,
    };
    const operand1Range = operand1Up - operand1Low + 1;
    const operand2Range = operand2Up - operand2Low + 1;
    switch (op) {
      case "addition":
        for (let i = questionLower; i <= questionUpper; i++) {
          const operand1 =
            Math.floor(Math.random() * operand1Range) + operand1Low;
          const operand2 =
            Math.floor(Math.random() * operand2Range) + operand2Low;
          updatedQuestionAnswers["question" + i] = {
            question: `${operand1} + ${operand2} =`,
            answer: "",
            answerKey: (operand1 + operand2).toString(),
            showPanel: false,
          };
        }
        break;
      case "subtraction":
        for (let i = questionLower; i <= questionUpper; i++) {
          if (options.subtraction.allowNegatives || operand1Low > operand2Up) {
            console.log("got in here");
            const operand1 =
              Math.floor(Math.random() * operand1Range) + operand1Low;
            const operand2 =
              Math.floor(Math.random() * operand2Range) + operand2Low;
            updatedQuestionAnswers["question" + i] = {
              question: `${operand1} - ${operand2} =`,
              answer: "",
              answerKey: (operand1 - operand2).toString(),
              showPanel: false,
            };
          } else {
            if (operand1Up < operand2Low) {
              errorMessagesArray.push({
                name: "only negative",
                message:
                  'Only negative answers possible.  Please adjust ranges or select "Allow negative answers"',
              });
            }
            if (errorMessagesArray.length > 0) {
              return setErrorMessages(errorMessagesArray);
            }
            if (operand1Low < operand2Low) {
              const adjustedOperand1Low = operand2Low;
              const adjustedOperand1Range =
                operand1Up - adjustedOperand1Low + 1;
              const operand1 =
                Math.floor(Math.random() * adjustedOperand1Range) +
                adjustedOperand1Low;
              const adjustedOperand2Up = operand1;
              const adjustedOperand2Range =
                adjustedOperand2Up - operand2Low + 1;
              const operand2 =
                Math.floor(Math.random() * adjustedOperand2Range) + operand2Low;
              updatedQuestionAnswers["question" + i] = {
                question: `${operand1} - ${operand2} =`,
                answer: "",
                answerKey: (operand1 - operand2).toString(),
                showPanel: false,
              };
            } else if (operand1Low < operand2Up) {
              console.log("woopeee!");
              const operand1 =
                Math.floor(Math.random() * operand1Range) + operand1Low;
              const adjustedOperand2Up = operand1;
              const adjustedOperand2Range =
                adjustedOperand2Up - operand2Low + 1;
              const operand2 =
                Math.floor(Math.random() * adjustedOperand2Range) + operand2Low;
              updatedQuestionAnswers["question" + i] = {
                question: `${operand1} - ${operand2} =`,
                answer: "",
                answerKey: (operand1 - operand2).toString(),
                showPanel: false,
              };
            }
          }
        }
        break;
      case "multiplication":
        for (let i = questionLower; i <= questionUpper; i++) {
          const operand1 =
            Math.floor(Math.random() * operand1Range) + operand1Low;
          const operand2 =
            Math.floor(Math.random() * operand2Range) + operand2Low;
          updatedQuestionAnswers["question" + i] = {
            question: `${operand1} x ${operand2} =`,
            answer: "",
            answerKey: (operand1 * operand2).toString(),
            showPanel: false,
          };
        }
        break;
      case "division":
        for (let i = questionLower; i <= questionUpper; i++) {
          const operand1 =
            Math.floor(Math.random() * operand1Range) + operand1Low;
          const operand2 =
            Math.floor(Math.random() * operand2Range) + operand2Low;
          updatedQuestionAnswers["question" + i] = {
            question: `${operand1} / ${operand2} =`,
            answer: "",
            answerKey: (operand1 / operand2).toString(),
            showPanel: false,
          };
        }
        break;
      case "exponent":
        for (let i = questionLower; i <= questionUpper; i++) {
          const operand1 =
            Math.floor(Math.random() * operand1Range) + operand1Low;
          const operand2 =
            Math.floor(Math.random() * operand2Range) + operand2Low;
          updatedQuestionAnswers["question" + i] = {
            question: `${operand1} to the power of ${operand2} =`,
            answer: "",
            answerKey: Math.pow(operand1, operand2).toString(),
            showPanel: false,
          };
        }
        break;
      default:
        return;
    }
    setActiveQuestionAnswers(updatedQuestionAnswers);
    console.log(updatedQuestionAnswers);
    setTimedMessage({
      showing: true,
      message: "Questions Generated, remember to save :)",
    });
    setTimeout(() => {
      setTimedMessage({ showing: false, message: "" });
    }, 4500);
    closeModalHandler();
  };

  return (
    <>
      <Heading as="h1" size="xl" marginBottom="20px" className={classes.Title}>
        Question Wizard
      </Heading>
      <hr style={{ marginBottom: "15px" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Heading className={classes.Teal} as="h2" size="md" minWidth="200px">
          Question Range:
        </Heading>
        <Heading className={classes.Teal} as="h4" size="sm" marginRight="10px">
          from
        </Heading>
        <Select
          variant="flushed"
          type="number"
          onChange={(event) => setQuestionRangeLower(+event.target.value)}
        >
          {panelArray.map((number) => {
            return (
              <option value={number} key={number}>
                {number}
              </option>
            );
          })}
        </Select>
        <Heading className={classes.Teal} as="h4" size="sm" margin="0 10px">
          to
        </Heading>
        <Select
          variant="flushed"
          type="number"
          onChange={(event) => setQuestionRangeUpper(+event.target.value)}
        >
          {panelArray.map((number) => {
            return (
              <option value={number} key={number}>
                {number}
              </option>
            );
          })}
        </Select>
      </div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="1px solid grey"
        boxShadow="1px 2px 3px #888888"
        borderRadius="5px"
        margin="20px 20px 20px 0"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Heading className={classes.Teal} as="h3" size="md" margin="10px">
            First number:
          </Heading>
          <Heading as="h4" size="md">
            {" "}
            a random number between
          </Heading>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="15px"
        >
          <Input
            variant="flushed"
            type="number"
            placeholder="Enter low limit"
            onChange={(event) => setOperand1Lower(+event.target.value)}
          ></Input>
          <Heading className={classes.Teal} as="h4" size="sm" margin="0 30px">
            and
          </Heading>
          <Input
            variant="flushed"
            type="number"
            placeholder="Enter high limit"
            onChange={(event) => setOperand1Upper(+event.target.value)}
          ></Input>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        width="75%"
      >
        <Heading className={classes.Teal} as="h2" size="md" marginRight="20px">
          Operation:
        </Heading>
        <Select
          variant="flushed"
          name="operator"
          onChange={(event) => setOperator(event.target.value)}
        >
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
          <option value="exponent">Exponent</option>
        </Select>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="1px solid grey"
        boxShadow="1px 2px 3px #888888"
        borderRadius="5px"
        margin="20px"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Heading className={classes.Teal} as="h3" size="md" margin="10px">
            Second number:
          </Heading>
          <Heading as="h4" size="md">
            {" "}
            a random number between
          </Heading>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="15px"
        >
          <Input
            variant="flushed"
            type="number"
            placeholder="Enter low limit"
            onChange={(event) => setOperand2Lower(+event.target.value)}
          ></Input>
          <Heading className={classes.Teal} as="h4" size="sm" margin="0 30px">
            and
          </Heading>
          <Input
            variant="flushed"
            type="number"
            placeholder="Enter high limit"
            onChange={(event) => setOperand2Upper(+event.target.value)}
          ></Input>
        </Box>
      </Box>

      {operator === "subtraction" ? (
        <div className={classes.Options}>
          <input
            type="checkbox"
            name="allow-negatives"
            onChange={() =>
              setOptions({
                ...options,
                subtraction: {
                  ...options.subtraction,
                  allowNegatives: !options.subtraction.allowNegatives,
                },
              })
            }
          />
          <label className={classes.Teal} htmlFor="allow-negatives">
            Allow negative answers
          </label>
        </div>
      ) : null}

      {errorMessages.length > 0 ? (
        <div className={classes.Errors}>
          {errorMessages.map((err) => {
            return <p key={err.name}>{err.message}</p>;
          })}
        </div>
      ) : null}

      {/* {addThirdNumber ?
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
                        <Input type='number' placeholder='Enter low limit' onChange={event => setOperand2Lower(+event.target.value)}></Input>
                        <h4>and</h4>
                        <Input type='number' placeholder='Enter high limit' onChange={event => setOperand2Upper(+event.target.value)}></Input>
                    </div>
                </> : null} */}
      <div className={classes.ButtonBox}>
        <Button
          margin="5px"
          variant="ghost"
          width="150px"
          onClick={closeModalHandler}
        >
          cancel
        </Button>
        <Button
          margin="auto"
          variant="outline"
          variantColor="teal"
          width="175px"
          onClick={() =>
            questionWizardHandler(
              questionRangeLower,
              questionRangeUpper,
              operand1Lower,
              operand1Upper,
              operator,
              operand2Lower,
              operand2Upper
            )
          }
        >
          Conjure Questions!
        </Button>
      </div>
      {/* <button onClick={() => setAddThirdNumber(!addThirdNumber)}>{!addThirdNumber ? 'Add Third Number' : 'Remove third number'}</button> */}
    </>
  );
};

export default QuestionWizard;
