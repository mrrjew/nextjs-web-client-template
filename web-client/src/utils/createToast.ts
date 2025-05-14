import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type toastType = "info" | "success" | "warning" | "error" | "default";

export const createToast = (msg: string = "", type: toastType = "error") => {
  toast(msg, {
    position: "top-right",
    type,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
