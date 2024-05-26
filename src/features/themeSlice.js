import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  initialState: localStorage.getItem("theme") || "light",
  name: "themeSlice",
  reducers: {
    setTheme: (state, action) => {
      document.body.setAttribute("data-bs-theme", action.payload);
      localStorage.setItem("theme", action.payload);
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
