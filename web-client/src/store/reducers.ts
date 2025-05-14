"use client";

import { combineReducers } from "redux";
import { apiSlice } from "./api/apiSlice";

const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  //   if (action.type === AppDuck.types.LOGOUT_USER) {
  //     return appReducer(undefined, action);
  //   }

  return appReducer(state, action);
};

export default rootReducer;
