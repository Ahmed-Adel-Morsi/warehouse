import { logout } from "../features/authSlice";
import { toastFire } from "./toastFire";

const apiCall = async (route, options, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${route}`,
      options,
    );
    const data = await response.json();

    if (!data.success) {
      if (data.message === "timeout") {
        dispatch(logout());
        toastFire("warning", "انتهت صلاحية الجلسة، يرجي تسجيل الدخول مجدد!");
        return rejectWithValue({
          message: "انتهت صلاحية الجلسة، يرجي تسجيل الدخول مجدد!",
        });
      }
      return rejectWithValue(data || { message: "حدث خطأ ما" });
    }

    return data.data;
  } catch (error) {
    return rejectWithValue(error.message || "حدث خطأ ما");
  }
};

export default apiCall;
