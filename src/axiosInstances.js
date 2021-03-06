import axios from "axios";

export const newWorksheetAxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// newWorksheetAxiosInstance.defaults.headers.post["Content-Type"] =
//   "multipart/form-data";

// newWorksheetAxiosInstance.defaults.headers.put["Content-Type"] =
//   "multipart/form-data";

export default newWorksheetAxiosInstance;
