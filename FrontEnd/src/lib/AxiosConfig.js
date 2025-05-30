import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // tell the server we're sending JSON
  },
});

export default api;

// i think its not working or i dont understand why it makes troble  *_*

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("auth_token"); // Get token from browser
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Attach token to every request
//     }
//     return config; // Must return the config!
//   },
//   (error) => Promise.reject(error)
// );
