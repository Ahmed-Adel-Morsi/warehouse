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

export const getTransactionsOfType = createAsyncThunk(
  "transactionsSlice/getTransactionsOfType",
  async (type, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/transactions?type=${type}`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

export const getTransactionsByProductId = createAsyncThunk(
  "transactionsSlice/getTransactionById",
  async (productId, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/transactions?product_id=${productId}`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

export const getTransactionByInvoiceNumber = createAsyncThunk(
  "transactionsSlice/getTransactionByInvoiceNumber",
  async ({ type, invoiceNumber }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/transactions?type=${type}&invoice_number=${invoiceNumber}`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(getTransactionsOfType.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getTransactionsByProductId.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getTransactionByInvoiceNumber.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default transactionsSlice.reducer;
