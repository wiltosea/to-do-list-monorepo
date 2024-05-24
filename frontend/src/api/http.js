import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
    "access-control-allow-origin": "*",
  }
});

export default http;