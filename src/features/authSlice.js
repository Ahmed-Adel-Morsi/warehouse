import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";
import { toastFire } from "../utils/toastFire";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    return await apiCall(
      `/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      },
      rejectWithValue
    );
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userDetails, { rejectWithValue }) => {
    return await apiCall(
      `/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      },
      rejectWithValue
    );
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        localStorage.setItem("token", token);
        toastFire(
          "success",
          `<div class="fw-bold fs-small">مرحباً بعودتك! تم تسجيل الدخول بنجاح.</div>
          <div class="fs-small">يمكنك الآن استخدام البرنامج.</div>`
        );
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        localStorage.setItem("token", token);
        toastFire("success", "تم إنشاء الحساب بنجاح");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
