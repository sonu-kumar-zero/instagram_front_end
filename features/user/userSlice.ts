"use client";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  user: {
    id: string;
    userName: string;
    bio: string | null;
    email: string;
    followerCount: number;
    followingCount: number;
    imageUrl: string | null;
    name: string | null;
    postsCount: number;
  };
  token: string | null;
}

// bio: null;
// createdAt: "2024-05-29T13:52:49.037Z";
// email: "s@1.com";
// followerCount: 0;
// followingCount: 0;
// id: "c50d87cc-0499-456b-80f1-94118f92fcdb";
// imageUrl: null;
// name: null;
// password: "$2b$05$bsaFX8mp8gRalsGUkAjcr.S9s3FUBcTNEDSAIGLxm2DwF.i7420PW";
// postsCount: 0;
// profileType: "PRIVATE";
// updatedAt: "2024-05-29T13:52:49.037Z";
// userName: "sonustark12";

const initialState: initialStateTypes = {
  user: {
    id: "",
    userName: "",
    bio: null,
    email: "",
    followerCount: 0,
    followingCount: 0,
    imageUrl: null,
    name: null,
    postsCount: 0
  },
  token: null
};

function addUserReducer(
  state: initialStateTypes,
  action: {
    payload: {
      id: string;
      userName: string;
      bio: string | null;
      email: string;
      followerCount: number;
      followingCount: number;
      imageUrl: string | null;
      name: string | null;
      postsCount: number;
      token: string | null;
    };
  }
) {
  state.user.id = action.payload.id;
  state.user.userName = action.payload.userName;
  state.user.bio = action.payload.bio;
  state.user.email = action.payload.email;
  state.user.followerCount = action.payload.followerCount;
  state.user.followingCount = action.payload.followingCount;
  state.user.imageUrl = action.payload.imageUrl;
  state.user.name = action.payload.name;
  state.user.postsCount = action.payload.postsCount;
  state.token = action.payload.token;
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
