export interface IAuthState {
  user: User | null;
  status: StateStatus;
  token: string | null;
}

export enum StateStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface IBooking {
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
