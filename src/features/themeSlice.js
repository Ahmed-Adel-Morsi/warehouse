import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  return localStorage.getItem("theme") || "light";
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: {
    theme: getInitialTheme(),
  },
  reducers: {
    setTheme: (state, action) => {
      document.body.setAttribute("data-bs-theme", action.payload);
      localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
