import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  /*
    Headers setados de acordo com os headers do Postman para fazer a testagem da API.
  */
  headers: {
    "Content-type": "application/json, application/x-www-form-urlencoded, text/plain, multipart/form-data",
    "Access-Control-Allow-Origin": process.env.REACT_APP_API_URL,
    "Access-Control-Allow-Headers": "Accept",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "*/*",
    "Host": "Localhost:8081"
  }
});