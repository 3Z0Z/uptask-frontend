import axios from "axios";

const api_auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api_auth;
