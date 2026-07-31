import { toast } from "react-toastify";

function successToast(message: string) {
  toast && toast.success(message);
}

function errorToast(message: string) {
  toast && toast.error(message);
}
function infoToast(message: string) {
  toast && toast.info(message);
}

export { successToast, errorToast,infoToast };
