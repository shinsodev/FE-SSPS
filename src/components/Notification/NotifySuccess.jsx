import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function notifySuccess(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

export { notifySuccess };
