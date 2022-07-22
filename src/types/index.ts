export interface IAuthState {
  user: User | null;
  status: StateStatus;
  token: string | null;
  message: string;
}

export interface ITripsState {
  trips: ITrip[] | null;
  status: StateStatus;
}

export interface ITripState {
  trip: ITrip | null;
  status: StateStatus;
}

export interface IBookingsState {
  bookings: IBooking[] | null;
  status: StateStatus;
  isDeleted: StateStatus;
}

export enum StateStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface IBooking {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  totalPrice: number;
  date: string;
  createdAt: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
}

export interface ICreatedBooking {
  tripId: string;
  userId: string;
  guests: number;
  date: string;
}

export interface ITrip {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  image: string;
  createdAt: string;
}

export type SignUpUser = {
  fullName: string;
  email: string;
  password: string;
};

export type SignInUser = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export type PostUserRes = {
  token: string;
  user: User;
};

export type TripPayload = {
  token: string;
  tripId: string;
};

export type addBookingPayload = {
  token: string;
  booking: ICreatedBooking;
};

export type deleteBookingPayload = {
  token: string;
  bookingId: string;
};
