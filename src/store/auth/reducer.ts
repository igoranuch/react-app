import { createReducer } from "@reduxjs/toolkit";
import { IAuthState, StateStatus } from "../../types";
import { getAuthenticatedUser, loginUser, registerUser } from "./actions";

const token = localStorage.getItem("token");

const initialState: IAuthState = {
  user: null,
  status: StateStatus.IDLE,
  token,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(registerUser.pending, (state) => {
    state.status = StateStatus.LOADING;
  });

  builder.addCase(registerUser.fulfilled, (state, { payload }) => {
    const { user } = payload;

    state.status = StateStatus.SUCCESS;
    state.user = user.user;
    state.token = user.token;
  });

  builder.addCase(loginUser.pending, (state) => {
    state.status = StateStatus.LOADING;
  });

  builder.addCase(loginUser.fulfilled, (state, { payload }) => {
    const { user } = payload;

    state.status = StateStatus.SUCCESS;
    state.user = user.user;
    state.token = user.token;
  });

  builder.addCase(getAuthenticatedUser.pending, (state) => {
    state.status = StateStatus.LOADING;
  });

  builder.addCase(getAuthenticatedUser.fulfilled, (state, { payload }) => {
    const { user } = payload;

    state.status = StateStatus.SUCCESS;
    state.user = user;
  });
});

export { reducer };
