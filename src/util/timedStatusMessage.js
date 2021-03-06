export const timedStatusMessage = (message, isError, setStatusCallback) => {
  setStatusCallback({ message, isError, spinner: false });
  if (isError) {
    setTimeout(() => {
      setStatusCallback({ message: "", isError: false, spinner: false });
    }, 4000);
  } else {
    setTimeout(() => {
      setStatusCallback({ message: "", isError: false, spinner: false });
    }, 2000);
  }
};
