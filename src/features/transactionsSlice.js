import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../elements/apiCall";

export const fetchTransactions = createAsyncThunk(
  "transactionsSlice/fetchTransactions",
  async (_, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`,
      undefined,
      rejectWithValue
    );
    return data;
  }
);

export const getTransactionsOfType = createAsyncThunk(
  "transactionsSlice/getTransactionsOfType",
  async (type, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions?type=${type}`,
      undefined,
      rejectWithValue
    );
    return data;
  }
);

export const getTransactionsByProductId = createAsyncThunk(
  "transactionsSlice/getTransactionsByProductId",
  async (productId, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions?productId=${productId}`,
      undefined,
      rejectWithValue
    );
    return data;
  }
);

export const getTransactionByInvoiceNumber = createAsyncThunk(
  "transactionsSlice/getTransactionByInvoiceNumber",
  async ({ type, invoiceNumber }, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions?type=${type}&invoiceNumber=${invoiceNumber}`,
      undefined,
      rejectWithValue
    );
    return data[0]; // Assuming only one transaction matches
  }
);

export const addTransaction = createAsyncThunk(
  "transactionsSlice/addTransaction",
  async (transaction, { getState, rejectWithValue }) => {
    const { data: transactions } = getState().transactions;

    const lastTransaction = transactions.reduce(
      (prev, curr) => (prev.invoiceNumber > curr.invoiceNumber ? prev : curr),
      { invoiceNumber: 0 }
    );

    const newTransaction = {
      invoiceNumber: lastTransaction.invoiceNumber + 1,
      ...transaction,
    };

    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
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
