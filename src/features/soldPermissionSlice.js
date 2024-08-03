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
    currentChoice: {},
  },
  reducers: {
    setChosenCustomer: (state, action) => {
      setValue("chosenCustomer", action.payload, action.payload !== null);
      state.chosenCustomer = action.payload;
    },

    setSoldPermissionOrders: (state, action) => {
      const value = Array.isArray(action.payload)
        ? action.payload
        : [
            ...state.soldPermissionOrders,
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
      setValue("soldPermissionOrders", value, value.length > 0);
      state.soldPermissionOrderIds = value.map((order) => order._id);
      state.chosenProductToSell = null;
      state.soldPermissionOrders = value;
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
      state.currentChoice = action.payload;
      state.chosenProductToSell = action.payload;
    },

    setCurrentChoice: (state, action) => {
      state.currentChoice = action.payload;
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
      state.currentChoice = {};
    },
  },
});

export const {
  setChosenCustomer,
  setSoldPermissionOrders,
  setSoldPermissionInvoiceInfo,
  setChosenProductToSell,
  setCurrentChoice,
  resetSoldPermission,
} = soldPermissionSlice.actions;

export default soldPermissionSlice.reducer;
