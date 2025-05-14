import { useProfile } from "@/context";
import { app } from "config/firebase";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useSession = () => {
  const { clearUser }: any = useProfile();
  const router = useRouter();
  const setSession = (token: string, userInfo: any, userId: string) => {
    Cookies.set("auth-token", token);
    Cookies.set("user_id", userId);
    Cookies.set("user_info", JSON.stringify(userInfo));
  };

  const getSession = () => {
    const token = Cookies.get("auth-token");
    const userInfo = JSON.parse(
      Cookies.get("user_info") ? Cookies.get("user_info")! : "{}",
    );
    const userId = Cookies.get("user_id");
    return {
      token,
      userInfo,
      userId,
    };
  };

  const clearSession = () => {
    Cookies.remove("auth-token");
    Cookies.remove("user_id");
    Cookies.remove("user_info");
  };

  const handleLogout = async () => {
    const auth = getAuth(app);
    await auth.signOut();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getSession()?.token}`,
        },
      });
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      clearSession();
      clearUser();
      setTimeout(() => {
        router.push("/auth/login");
      }, 10);
    }
  };

  return {
    setSession,
    getSession,
    clearSession,
    handleLogout,
  };
};
