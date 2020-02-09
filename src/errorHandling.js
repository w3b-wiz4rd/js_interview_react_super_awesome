import { toast } from "react-toastify";

export const errorHandling = error => {
  if (error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Ocurrio un error, favor de intentar más tarde");
  }
};
