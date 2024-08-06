import { createSlice } from "@reduxjs/toolkit";
import { getValue, setValue } from "../utils/localStorageHandler";
import { toastFire } from "../utils/toastFire";

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
      if (action.payload) {
        setValue("chosenCustomer", action.payload, action.payload !== null);
        state.chosenCustomer = action.payload;
        toastFire("success", `تم اختيار العميل ${action.payload.name} بنجاح`);
      } else {
        toastFire("warning", "يرجى اختيار العميل من فضلك");
      }
    },

    addSoldPermissionOrder: (state, action) => {
      const value = [
        ...state.soldPermissionOrders,
        {
          ...state.chosenProductToSell,
          orignalPrice: state.chosenProductToSell.price,
          originalQuantity: state.chosenProductToSell.quantity,
          ...action.payload,
          totalPrice:
            parseInt(action.payload.quantity) *
            parseFloat(action.payload.price),
        },
      ];
      setValue("soldPermissionOrders", value, value.length > 0);
      state.soldPermissionOrderIds = value.map((order) => order._id);
      state.soldPermissionOrders = value;
      toastFire(
        "success",
        `تم اضافة الصنف ${state.chosenProductToSell.name} بنجاح`
      );
      state.chosenProductToSell = null;
    },

    removeSoldPermissionOrder: (state, action) => {
      const value = state.soldPermissionOrders.filter(
        (product) => product._id !== action.payload._id
      );
      state.soldPermissionOrderIds = state.soldPermissionOrderIds.filter(
        (id) => id !== action.payload._id
      );
      setValue("soldPermissionOrders", value, value.length > 0);
      state.soldPermissionOrders = value;
      toastFire("success", `تم حذف ${action.payload.name} بنجاح`);
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
      toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    },
  },
});

export const {
  setChosenCustomer,
  addSoldPermissionOrder,
  removeSoldPermissionOrder,
  setSoldPermissionInvoiceInfo,
  setChosenProductToSell,
  resetSoldPermission,
} = soldPermissionSlice.actions;

export default soldPermissionSlice.reducer;
