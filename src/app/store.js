import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productsSlice";
import themeReducer from "../features/themeSlice";
import customersReducer from "../features/customersSlice";
import vendorsReducer from "../features/vendorsSlice";
import transactionsReducer from "../features/transactionsSlice";
import addPermissionReducer from "../features/addPermissionSlice";
import soldPermissionReducer from "../features/soldPermissionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    customers: customersReducer,
    vendors: vendorsReducer,
    transactions: transactionsReducer,
    theme: themeReducer,
    addPermission: addPermissionReducer,
    soldPermission: soldPermissionReducer,
  },
  devTools: false,
});

export default store;
