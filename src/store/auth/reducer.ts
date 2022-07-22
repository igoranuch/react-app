import { createSlice } from "@reduxjs/toolkit";
import { IAuthState, StateStatus, User } from "../../types";
import { getAuthenticatedUser, loginUser, registerUser } from "./actions";

const token = localStorage.getItem("token");

const initialState: IAuthState = {
  user: null,
  status: StateStatus.IDLE,
  token,
  message: "",
};

const reducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.IDLE;
    },
    logOut: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.status = StateStatus.IDLE;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user, token } = payload;

      state.status = StateStatus.SUCCESS;
      state.user = user;
      state.token = token;
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.status = StateStatus.ERROR;
      state.message = payload as string;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user, token } = payload;

      state.status = StateStatus.SUCCESS;
      state.user = user;
      state.token = token;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.status = StateStatus.ERROR;
      state.message = payload as string;
    });

    builder.addCase(getAuthenticatedUser.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(getAuthenticatedUser.fulfilled, (state, { payload }) => {
      const { user } = payload;

      state.status = StateStatus.SUCCESS;
      state.user = user;
    });

    builder.addCase(getAuthenticatedUser.rejected, (state, { payload }) => {
      state.status = StateStatus.ERROR;
      state.message = payload as string;
    });
  },
});

export const { reset } = reducer.actions;
export const { logOut } = reducer.actions;

export default reducer.reducer;
