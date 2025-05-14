"use client";
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
  overrideExisting: false,
});

export const {} = authApi;
