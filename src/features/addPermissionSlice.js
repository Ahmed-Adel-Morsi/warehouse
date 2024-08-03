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
    currentChoice: {},
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
              ...state.currentChoice,
              orignalPrice: state.currentChoice.price,
              originalQuantity: state.currentChoice.quantity,
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
      state.currentChoice = action.payload;
      state.chosenProductToBuy = action.payload;
    },

    setCurrentChoice: (state, action) => {
      state.currentChoice = action.payload;
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
      state.currentChoice = {};
    },
  },
});

export const {
  setChosenVendor,
  setAddPermissionOrders,
  setAddPermissionInvoiceInfo,
  setChosenProductToBuy,
  setCurrentChoice,
  resetAddPermission,
} = addPermissionSlice.actions;

export default addPermissionSlice.reducer;
