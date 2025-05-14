import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  GoogleAuthProvider,
  app,
  getAuth,
  signInWithPopup,
} from "config/firebase";
import Cookies, { set } from "js-cookie";
import { useRouter } from "next/navigation";
import { useSession } from "../useSession";

export const useGoogleLogin = () => {
  const router = useRouter();
  const { setSession } = useSession();

  const authWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log("Google Auth Result",result);
      const user = result?.user;
      const token = await user?.getIdToken();
      // console.log("Google Auth Token",token);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log("Google Auth Response",response);
      return response.data;
    } catch (error: any) {
      console.log("Google local error: ", error);
      // console.log(error.response.data.data.error);
    }
  };

  const { mutate: googleLogin, isLoading } = useMutation({
    mutationFn: authWithGoogle,
    onSuccess: (result) => {
      console.log("authWithGoogle", result);
      const { data } = result;
      console.log(data, result);
      setSession(data.token, data, data.user_id);
      router.push("/");
    },
  });

  return {
    googleLogin,
    isLoading,
  };
};
