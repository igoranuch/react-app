import axios from "axios";
import API from "../common/api/api";

export const authService = {
  register: async function (userData) {
    const res = await axios.post(API.BASE_URL + API.SIGN_UP, userData);

    if (res.data) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  login: async function (userData) {
    const res = await axios.post(API.BASE_URL + API.SIGN_IN, userData);

    if (res.data) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  getAuthUser: async function (token) {
    const res = await axios.post(API.BASE_URL + API.GET_AUTH_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
