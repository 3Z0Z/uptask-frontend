import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "authorization": `Bearer ${localStorage.getItem("token")}`,
  }
});

export default api;
