import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function notifyError(message) {
  toast.error(message, {
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

export { notifyError };
