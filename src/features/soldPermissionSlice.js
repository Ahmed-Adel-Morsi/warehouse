import { createSlice } from "@reduxjs/toolkit";
import { getValue, setValue } from "../utils/localStorageHandler";

const soldPermissionSlice = createSlice({
  name: "soldPermissionSlice",
  initialState: {
    chosenCustomer: getValue("chosenCustomer"),
    soldPermissionOrders: getValue("soldPermissionOrders", []),
    soldPermissionInvoiceInfo: getValue("soldPermissionInvoiceInfo"),
    soldPermissionOrderIds: getValue("soldPermissionOrders", []).map(
      (order) => order._id
    ),
    chosenProductToSell: null,
  },
  reducers: {
    setChosenCustomer: (state, action) => {
      setValue("chosenCustomer", action.payload, action.payload !== null);
      state.chosenCustomer = action.payload;
    },

    setSoldPermissionOrders: (state, action) => {
      setValue(
        "soldPermissionOrders",
        action.payload,
        action.payload.length > 0
      );
      state.soldPermissionOrderIds = action.payload.map((order) => order._id);
      state.chosenProductToSell = null;
      state.soldPermissionOrders = action.payload;
    },

    setSoldPermissionInvoiceInfo: (state, action) => {
      setValue(
        "soldPermissionInvoiceInfo",
        action.payload,
        action.payload !== null
      );
      state.soldPermissionInvoiceInfo = action.payload;
    },

    setChosenProductToSell: (state, action) => {
      state.chosenProductToSell = action.payload;
    },

    resetSoldPermission: (state) => {
      setValue("chosenCustomer", null);
      setValue("soldPermissionOrders", []);
      setValue("soldPermissionInvoiceInfo", null);
      state.chosenCustomer = null;
      state.soldPermissionOrders = [];
      state.soldPermissionInvoiceInfo = null;
      state.soldPermissionOrderIds = [];
      state.chosenProductToSell = null;
    },
  },
});

export const {
  setChosenCustomer,
  setSoldPermissionOrders,
  setSoldPermissionInvoiceInfo,
  setChosenProductToSell,
  resetSoldPermission,
} = soldPermissionSlice.actions;

export default soldPermissionSlice.reducer;
