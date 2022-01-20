import axios from "axios";

const localHost = "localHost:3000";

const herokuUrl = "https://hidden-picture-worksheets-api.herokuapp.com";

export const newWorksheetAxiosInstance = axios.create({
  baseURL: herokuUrl,
});

// newWorksheetAxiosInstance.defaults.headers.post["Content-Type"] =
//   "multipart/form-data";

// newWorksheetAxiosInstance.defaults.headers.put["Content-Type"] =
//   "multipart/form-data";

export default newWorksheetAxiosInstance;
