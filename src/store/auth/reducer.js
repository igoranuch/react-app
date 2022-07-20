import { createReducer } from "@reduxjs/toolkit";
import { getUser, loginUser, registerUser } from "./actions";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  status: "",
  token: token ? token : null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(registerUser.pending, (state) => {
    state.status = "LOADING";
  });

  builder.addCase(registerUser.fulfilled, (state, { payload }) => {
    const { user, token } = payload;

    state.status = "SUCCESS";
    state.user = user;
    state.token = token;
  });

  builder.addCase(loginUser.pending, (state) => {
    state.status = "LOADING";
  });

  builder.addCase(loginUser.fulfilled, (state, { payload }) => {
    const { user, token } = payload;

    state.status = "SUCCESS";
    state.user = user;
    state.token = token;
  });

  builder.addCase(getUser.pending, (state) => {
    state.status = "LOADING";
  });

  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    const user = payload;

    state.status = "SUCCESS";
    state.user = user;
  });
});

export { reducer };
