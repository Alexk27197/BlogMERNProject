import axios from "axios";

const instence = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default instence;
