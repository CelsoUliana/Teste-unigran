import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  /*
    Headers setados de acordo com os headers do Postman para fazer a testagem da API.
  */
  headers: {
    "Content-type": "application/json, application/x-www-form-urlencoded, text/plain, text/html, multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Accept": "*/*",
  }
});