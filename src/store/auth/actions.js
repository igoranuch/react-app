import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk("REGISTER", async (payload, { extra }) => ({
  user: await extra.authService.register(payload),
}));

export const loginUser = createAsyncThunk("LOGIN", async (payload, { extra }) => ({
  user: await extra.authService.login(payload),
}));

export const getUser = createAsyncThunk("GET_AUTH_USER", async (token, { extra }) => ({
  user: await extra.authService.getAuthUser(token),
}));
