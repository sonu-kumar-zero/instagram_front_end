"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducers from "@/features/user/userSlice";
export const store = configureStore({
  reducer: userReducers
});


export type RootState = ReturnType<typeof store.getState>;