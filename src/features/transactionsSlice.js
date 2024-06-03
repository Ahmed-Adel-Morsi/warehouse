import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk(
  "transactionsSlice/fetchTransactions",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }
);

export const addTransaction = createAsyncThunk(
  "transactionsSlice/addTransaction",
  async (transaction) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }
);

const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState: {
    data: [],
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
  },
});

export default transactionsSlice.reducer;
