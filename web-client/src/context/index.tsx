/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: null,
});

const useProfile = () => useContext(UserContext);

const UserProvider = ({ children }: any) => {
  const userdata = Cookies.get("user_info");
  const user = userdata ? JSON.parse(userdata) : null;
  const token = Cookies.get("auth-token");

  const [userState, setUserState] = useState(user);

  const clearUser = () => {
    setUserState(null);
  };

  const updateProfile = async (data: FormData) => {
    const datafromform = {
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      mobile: data.get("mobile"),
      gender: data.get("gender"),
      email: data.get("email"),
      dob: data.get("dob"),
      about: data.get("about"),
    };
    const filteredData = Object.fromEntries(
      Object.entries(datafromform).filter(
        ([key, value]) => value !== undefined,
      ),
    );

    if (Object.keys(filteredData).length === 0) {
      console.log("No data to update."); // Optional: Log a message if no data is present
      return;
    }
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/edit/basic-info`,
        filteredData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setUserState(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProfilePhoto = async (data: FormData) => {
    // const datafromform={
    //   profilePic:data.get('image')
    // }

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/edit/profile-pic`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setUserState(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    setUserState(data.data);
    if (response.status === 403) {
      Cookies.remove("auth-token");
      Cookies.remove("user_info");
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  const values: any = {
    user: userState,
    updateProfilePhoto,
    updateProfile,
    getUser,
    clearUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { useProfile };

export default UserProvider;
