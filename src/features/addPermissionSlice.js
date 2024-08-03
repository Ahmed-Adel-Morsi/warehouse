import { createSlice } from "@reduxjs/toolkit";
import { getValue, setValue } from "../utils/localStorageHandler";

const addPermissionSlice = createSlice({
  name: "addPermissionSlice",
  initialState: {
    chosenVendor: getValue("chosenVendor"),
    addPermissionOrders: getValue("addPermissionOrders", []),
    addPermissionInvoiceInfo: getValue("addPermissionInvoiceInfo"),
    addPermissionOrderIds: getValue("addPermissionOrders", []).map(
      (order) => order._id
    ),
    chosenProductToBuy: null,
  },
  reducers: {
    setChosenVendor: (state, action) => {
      setValue("chosenVendor", action.payload, action.payload !== null);
      state.chosenVendor = action.payload;
    },

    setAddPermissionOrders: (state, action) => {
      setValue(
        "addPermissionOrders",
        action.payload,
        action.payload.length > 0
      );
      state.addPermissionOrderIds = action.payload.map((order) => order._id);
      state.chosenProductToBuy = null;
      state.addPermissionOrders = action.payload;
    },

    setAddPermissionInvoiceInfo: (state, action) => {
      setValue(
        "addPermissionInvoiceInfo",
        action.payload,
        action.payload !== null
      );
      state.addPermissionInvoiceInfo = action.payload;
    },

    setChosenProductToBuy: (state, action) => {
      state.chosenProductToBuy = action.payload;
    },

    resetAddPermission: (state) => {
      setValue("chosenVendor", null);
      setValue("addPermissionOrders", []);
      setValue("addPermissionInvoiceInfo", null);
      state.chosenVendor = null;
      state.addPermissionOrders = [];
      state.addPermissionInvoiceInfo = null;
      state.addPermissionOrderIds = [];
      state.chosenProductToBuy = null;
    },
  },
});

export const {
  setChosenVendor,
  setAddPermissionOrders,
  setAddPermissionInvoiceInfo,
  setChosenProductToBuy,
  resetAddPermission,
} = addPermissionSlice.actions;

export default addPermissionSlice.reducer;
