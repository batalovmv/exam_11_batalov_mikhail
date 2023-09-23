import axios from "axios";
const axiosInstanse  = axios.create({
  baseURL:'http://localhost:3100'
});
export default axiosInstanse