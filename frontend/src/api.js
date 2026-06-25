import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiError(error, fallback = "Something went wrong. Please try again.") {
  const data = error?.response?.data;

  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    return data;
  }

  if (data.detail) {
    return data.detail;
  }

  if (data.error) {
    return data.error;
  }

  const [firstError] = Object.values(data);

  if (Array.isArray(firstError)) {
    return firstError[0] || fallback;
  }

  if (typeof firstError === "string") {
    return firstError;
  }

  return fallback;
}

export default API;
