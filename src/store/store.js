import { configureStore } from "@reduxjs/toolkit";
import { reducer as auth } from "./auth/reducer";
import { authService } from "../services/authService";

export const store = configureStore({
  reducer: { auth },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: {
          authService,
        },
      },
      serializableCheck: false,
    });
  },
});
