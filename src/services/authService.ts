import axios from "axios";
import API from "../common/api/api";
import { SignInUser, SignUpUser } from "../types";

export const authService = {
  register: async function (userData: SignUpUser) {
    const res = await axios.post(API.BASE_URL + API.SIGN_UP, userData);

    if (res.data) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  login: async function (userData: SignInUser) {
    const res = await axios.post(API.BASE_URL + API.SIGN_IN, userData);

    if (res.data) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  getAuthUser: async function (token: string) {
    const res = await axios.get(API.BASE_URL + API.GET_AUTH_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
