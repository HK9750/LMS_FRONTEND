"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
