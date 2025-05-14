import axios from "axios";
import { cookies } from "next/headers";

export const serverAuthAxios = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your API base URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
