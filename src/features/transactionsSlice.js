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

export const getTransactionsOfType = createAsyncThunk(
  "transactionsSlice/getTransactionsOfType",
  async (type, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const data = await apiCall(
      `/transactions`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
    return data.filter((transaction) => transaction.transactionType === type);
  }
);

export const getTransactionsByProductId = createAsyncThunk(
  "transactionsSlice/getTransactionById",
  async (productId, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const data = await apiCall(
      `/transactions`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
    return data.filter(
      (transaction) => transaction.productDetails._id === productId
    );
  }
);

export const getTransactionByInvoiceNumber = createAsyncThunk(
  "transactionsSlice/getTransactionByInvoiceNumber",
  async ({ type, invoiceNumber }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const data = await apiCall(
      `/transactions`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
    return data.find(
      (transaction) =>
        transaction.transactionType === type &&
        transaction.invoiceNumber === invoiceNumber
    );
  }
);

export const addTransaction = createAsyncThunk(
  "transactionsSlice/addTransaction",
  async (transaction, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    const data = await apiCall(
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
    return data;
  }
);

const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState: {
    data: [],
    filteredData: [],
    transactionByInvoice: null,
    transactionsByProductId: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Transactions of Specific Type
      .addCase(getTransactionsOfType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsOfType.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredData = action.payload;
      })
      .addCase(getTransactionsOfType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Transaction by Product Id
      .addCase(getTransactionsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionsByProductId = action.payload;
      })
      .addCase(getTransactionsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Transaction by Invoice Number
      .addCase(getTransactionByInvoiceNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionByInvoiceNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionByInvoice = action.payload;
      })
      .addCase(getTransactionByInvoiceNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Transaction
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
