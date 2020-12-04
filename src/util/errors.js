export const questionWizardDetectErrors = (
  questionLower,
  questionUpper,
  operand1Low,
  operand1Up,
  op,
  operand2Low,
  operand2Up
) => {
  let errorMessagesArray = [];
  if (
    operand1Low === null ||
    operand1Up === null ||
    operand2Low === null ||
    operand2Up === "null"
  ) {
    errorMessagesArray.push({
      name: "missing value",
      message: "Please make sure all fields are filled in",
    });
  }
  if (questionLower > questionUpper) {
    errorMessagesArray.push({
      name: "range",
      message:
        'Please make sure the first value in the "question range" is less than the second value',
    });
  }
  if (operand1Up < operand1Low) {
    errorMessagesArray.push({
      name: "operand1",
      message:
        'Please make sure the low limit is less than the high limit when defining range for the "first number"',
    });
  }
  if (operand2Up < operand2Low) {
    errorMessagesArray.push({
      name: "operand2",
      message:
        'Please make sure the low limit is less than the high limit when defining range for the "second number"',
    });
  }
  return errorMessagesArray;
};
