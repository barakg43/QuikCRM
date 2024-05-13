import axios from "axios";
const DEV_IP = "barak-pc";
const BASE_URL = import.meta.env.DEV
  ? `http://${DEV_IP}:8080/quik/api`
  : "http://10.10.40.20:8080/quik/api";
// const BASE_URL = "http://barak-pc:8080/quik/api";
export const httpClient = axios.create({
  baseURL: BASE_URL,
});
