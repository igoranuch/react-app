import axios from "axios";
import API from "../common/api/api";
import { PostUserRes, SignInUser, SignUpUser, User } from "../types";

export const authService = {
  register: async function (userData: SignUpUser): Promise<PostUserRes> {
    const res = await axios.post(API.BASE_URL + API.SIGN_UP, userData);

    if (res.data) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  login: async function (userData: SignInUser): Promise<PostUserRes> {
    const res = await axios.post(API.BASE_URL + API.SIGN_IN, userData);

    if (res.data) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  getAuthUser: async function (token: string): Promise<User> {
    const res = await axios.get(API.BASE_URL + API.GET_AUTH_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
