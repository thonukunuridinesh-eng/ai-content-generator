import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
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

  if (!error?.response) {
    return `${fallback} The backend API could not be reached at ${API_BASE_URL}. Start the Django server or set VITE_API_URL to your deployed backend URL.`;
  }

  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    if (data.includes("<!doctype html") || data.includes("<html")) {
      return `${fallback} The API URL returned an HTML page instead of JSON. Check VITE_API_URL.`;
    }

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
