import axios from "axios";

export const api = axios.create({
  baseURL: "https://contacts-back-deploy.onrender.com/",
  timeout: 15000,
});
