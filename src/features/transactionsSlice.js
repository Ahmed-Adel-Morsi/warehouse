import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";

export const fetchTransactions = createAsyncThunk(
  "transactionsSlice/fetchTransactions",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/transactions`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

export const addTransaction = createAsyncThunk(
  "transactionsSlice/addTransaction",
  async (transaction, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(transaction),
      },
      rejectWithValue
    );
  }
);

const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState: {
    loading: false,
    error: null,
    transactions: [],
    detailedTransactions: [],
    soldTransactions: [],
    additionsTransactions: [],
    productTransactions: [],
    customerTransactions: [],
    invoiceNumberTransaction: null,
  },
  reducers: {
    getTransactionsByProductId: (state, action) => {
      state.productTransactions = state.detailedTransactions.filter(
        (transaction) => transaction.productDetails._id === action.payload
      );
    },
    getCustomerTransactions: (state, action) => {
      state.customerTransactions = state.detailedTransactions.filter(
        (transaction) => transaction.customerDetails._id === action.payload
      );
    },
    getInvoiceNumberTransaction: (state, action) => {
      state.invoiceNumberTransaction = state.transactions.find(
        (transaction) =>
          transaction.invoiceNumber === action.payload.invoiceNumber &&
          transaction.transactionType === action.payload.type
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.soldTransactions = action.payload.filter(
          (transaction) => transaction.transactionType === "sell"
        );
        state.additionsTransactions = action.payload.filter(
          (transaction) => transaction.transactionType === "buy"
        );

        const modifiedTransactions = [];
        action.payload.forEach((transaction) => {
          transaction.products.forEach((product) => {
            const newTransaction = {
              ...transaction,
              productDetails: { ...product },
            };
            delete newTransaction.products;
            modifiedTransactions.push(newTransaction);
          });
        });
        state.detailedTransactions = modifiedTransactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        if (action.payload.transactionType === "sell") {
          state.soldTransactions.unshift(action.payload);
        } else {
          state.additionsTransactions.unshift(action.payload);
        }
        state.transactions.unshift(action.payload);
      });
  },
});

export const {
  getTransactionsByProductId,
  getCustomerTransactions,
  getInvoiceNumberTransaction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
