import axios from "axios";

export const newWorksheetAxiosInstance = axios.create({
  baseURL: "https://hidden-picture-worksheets-api.herokuapp.com",
});

// newWorksheetAxiosInstance.defaults.headers.post["Content-Type"] =
//   "multipart/form-data";

// newWorksheetAxiosInstance.defaults.headers.put["Content-Type"] =
//   "multipart/form-data";

export default newWorksheetAxiosInstance;
