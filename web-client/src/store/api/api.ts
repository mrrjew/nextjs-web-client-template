"use client";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("auth-token");
export const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetch.interceptors.request.use(function interceptor(config) {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const basicFetch = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
