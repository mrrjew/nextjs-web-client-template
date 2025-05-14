import axios from "axios";
import Cookies from "js-cookie";

export const clientAuthAxios = () => {
  const token = Cookies.get("auth-token");
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your API base URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
