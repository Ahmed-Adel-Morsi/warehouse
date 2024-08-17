import { createSlice } from "@reduxjs/toolkit";
import { getValue, setValue } from "../utils/localStorageHandler";
import { toastFire } from "../utils/toastFire";

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
      if (action.payload) {
        setValue("chosenVendor", action.payload, action.payload !== null);
        state.chosenVendor = action.payload;
        toastFire("success", `تم اختيار المورد ${action.payload.name} بنجاح`);
      } else {
        toastFire("warning", "يرجى اختيار المورد من فضلك");
      }
    },

    addAdditionPermissionOrder: (state, action) => {
      const quantity = parseInt(action.payload.quantity);
      const price = parseFloat(action.payload.price);

      const value = [
        {
          ...state.chosenProductToBuy,
          transactionQuantity: quantity,
          transactionPrice: price,
          totalPrice: quantity * price,
        },
        ...state.addPermissionOrders,
      ];
      setValue("addPermissionOrders", value, value.length > 0);
      state.addPermissionOrderIds = value.map((order) => order._id);
      state.addPermissionOrders = value;
      toastFire(
        "success",
        `تم اضافة الصنف ${state.chosenProductToBuy.name} بنجاح`
      );
      state.chosenProductToBuy = null;
    },

    removeAdditionPermissionOrder: (state, action) => {
      const value = state.addPermissionOrders.filter(
        (product) => product._id !== action.payload._id
      );
      state.addPermissionOrderIds = state.addPermissionOrderIds.filter(
        (id) => id !== action.payload._id
      );
      setValue("addPermissionOrders", value, value.length > 0);
      state.addPermissionOrders = value;
      toastFire("success", `تم حذف ${action.payload.name} بنجاح`);
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
      toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    },
  },
});

export const {
  setChosenVendor,
  addAdditionPermissionOrder,
  removeAdditionPermissionOrder,
  setAddPermissionInvoiceInfo,
  setChosenProductToBuy,
  resetAddPermission,
} = addPermissionSlice.actions;

export default addPermissionSlice.reducer;
