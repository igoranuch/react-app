import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInUser, SignUpUser } from "../../types";
import { authService } from "../../services/authService";

export const registerUser = createAsyncThunk("register", async (payload: SignUpUser, thunkAPI) => {
  try {
    return await authService.register(payload);
  } catch (error) {
    const { message } = error as Error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk("login", async (payload: SignInUser, thunkAPI) => {
  try {
    return await authService.login(payload);
  } catch (error) {
    const { message } = error as Error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAuthenticatedUser = createAsyncThunk("getAuthenticatedUser", async (token: string, thunkAPI) => {
  try {
    return await authService.getAuthUser(token);
  } catch (error) {
    const { message } = error as Error;
    return thunkAPI.rejectWithValue(message);
  }
});
