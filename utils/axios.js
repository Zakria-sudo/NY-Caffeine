// utils/axios.js
"use server"
import axios from "axios";
import { cookies } from "next/headers"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// --- Auth request helper ---
export const apiWithAuth = async (config) => {
  const token = cookies().get("auth")?.value || "";

  console.log("hello");
  console.log(token); // read cookie by name
  const headers = {
    ...(config.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return api.request({ ...config, headers });
};

// --- Public request helper (no auth) ---
export const apiPublic = async (config) => {
  return api.request(config);
};

export default api;
