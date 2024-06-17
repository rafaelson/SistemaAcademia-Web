import axios from "axios";

var urlBase = "http://localhost:5193";
const Api = axios.create({
  baseURL: urlBase,
});

export default Api;
