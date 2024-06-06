import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiCall = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const fetchTransactions = createAsyncThunk(
  "transactionsSlice/fetchTransactions",
  async () => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`
    );
    return data;
  }
);

export const getTransactionsOfType = createAsyncThunk(
  "transactionsSlice/getTransactionsOfType",
  async (type) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`
    );
    return data.filter((transaction) => transaction.transactionType === type);
  }
);

export const getTransactionsByProductId = createAsyncThunk(
  "transactionsSlice/getTransactionById",
  async (productId) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`
    );
    return data.filter(
      (transaction) => transaction.productDetails.id === productId
    );
  }
);

export const getTransactionByInvoiceNumber = createAsyncThunk(
  "transactionsSlice/getTransactionByInvoiceNumber",
  async ({ type, invoiceNumber }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`
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
  async (transaction, { getState }) => {
    const { data: transactions } = getState().transactions;

    const lastTransaction = transactions
      .filter((curr) => curr.transactionType === transaction.transactionType)
      .reduce(
        (prev, curr) => (prev.invoiceNumber > curr.invoiceNumber ? prev : curr),
        { invoiceNumber: 0 }
      );

    const lastInvoiceNumber = lastTransaction.invoiceNumber || 0;

    const newTransaction = {
      invoiceNumber: lastInvoiceNumber + 1,
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
      }
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      // Fetch Transaction by Id
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
        state.error = action.error.message;
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
      });
  },
});

export default transactionsSlice.reducer;
