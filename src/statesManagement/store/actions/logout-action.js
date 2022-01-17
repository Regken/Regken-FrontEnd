import Cookies from "js-cookie";
import { LOGOUT } from "../constants/index";

export const logoutAction = async ({ dispatch, router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: LOGOUT,
    });
    Cookies.remove("user");
    router.push("/auth");
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
