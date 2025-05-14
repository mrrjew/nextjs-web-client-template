import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

export type AuthState = {
  auth: boolean;
  user: User;
};

type InitialState = {
  value: AuthState;
};

const initialState: InitialState = {
  value: {
    auth: false,
    // @ts-ignore
    user: {},
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: () => {},
    logout: () => {},
  },
});
