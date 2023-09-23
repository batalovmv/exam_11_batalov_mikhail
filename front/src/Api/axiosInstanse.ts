import axios from "axios";
const axiosInstanse  = axios.create({
  baseURL:'http://localhost:8000'
});
export default axiosInstanse