import { toast } from "react-toastify";
export default function ToastMessage(message: string) {
  const options: any = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  return {
    success() {
      toast.success(message, options);
    },
    warn() {
      toast.warning(message, options);
    },
    nomal() {
      toast(message, options);
    },
    error() {
      toast.error(message, options);
    },
    info() {
      toast.info(message, options);
    },
  };
}
