"use client";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  user: {
    _id: string;
    userName: string;
  };
}

const initialState: initialStateTypes = {
  user: {
    _id: "",
    userName: ""
  }
};

function addUserReducer(
  state: initialStateTypes,
  action: { payload: { _id: string; userName: string } }
) {
  console.log("add User Reducer Running");
  state.user._id = action.payload._id;
  state.user.userName = action.payload.userName;
}

// function getUser(state: any, action: any) {
//   return state.user;
// }

export const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: addUserReducer
  }
});

export const { addUser } = todoSlice.actions;

export default todoSlice.reducer;
