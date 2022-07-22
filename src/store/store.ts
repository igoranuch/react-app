import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/reducer";
import trips from "./trips/reducer";
import { reducer as trip } from "./trip/reducer";
import { reducer as bookings } from "./bookings/reducer";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { auth, trips, trip, bookings },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
