import axios from "axios";

const api = axios.create({
  baseURL: "https://delayanalysispredictionsystem-production.up.railway.app",
});

export default api;