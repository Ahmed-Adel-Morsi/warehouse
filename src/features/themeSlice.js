import { createSlice } from "@reduxjs/toolkit";
import { getValue, setValue } from "../utils/localStorageHandler";

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: getValue("theme", "light"),
  reducers: {
    setTheme: (state, action) => {
      document.body.setAttribute("data-bs-theme", action.payload);
      setValue("theme", action.payload, action.payload === "dark");
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
