import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productsSlice";
import themeReducer from "../features/themeSlice";
import customersReducer from "../features/customersSlice";
import vendorsReducer from "../features/vendorsSlice";
import transactionsReducer from "../features/transactionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    customers: customersReducer,
    vendors: vendorsReducer,
    transactions: transactionsReducer,
    theme: themeReducer,
  },
});

export default store;
