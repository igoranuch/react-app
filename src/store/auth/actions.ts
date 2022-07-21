import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInUser, SignUpUser, PostUserRes, User } from "../../types";
import { authService } from "../../services/authService";

export const registerUser = createAsyncThunk("register", async (payload: SignUpUser) => {
  const user: PostUserRes = await authService.register(payload);
  return { user };
});

export const loginUser = createAsyncThunk("login", async (payload: SignInUser) => {
  const user: PostUserRes = await authService.login(payload);
  return { user };
});

export const getAuthenticatedUser = createAsyncThunk("getAuthenticatedUser", async (token: string) => {
  const user: User = await authService.getAuthUser(token);
  return { user };
});
