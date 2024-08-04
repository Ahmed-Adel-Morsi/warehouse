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
      const value = Array.isArray(action.payload)
        ? action.payload
        : [
            ...state.addPermissionOrders,
            {
              ...state.chosenProductToBuy,
              orignalPrice: state.chosenProductToBuy.price,
              originalQuantity: state.chosenProductToBuy.quantity,
              ...action.payload,
              totalPrice:
                parseInt(action.payload.quantity) *
                parseFloat(action.payload.price),
            },
          ];
      setValue("addPermissionOrders", value, value.length > 0);
      state.addPermissionOrderIds = value.map((order) => order._id);
      state.chosenProductToBuy = null;
      state.addPermissionOrders = value;
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
