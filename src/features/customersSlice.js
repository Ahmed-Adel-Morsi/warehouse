import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";

// Thunk for fetching customers
export const fetchCustomers = createAsyncThunk(
  "customersSlice/fetchCustomers",
  async (_, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/customers`,
      undefined,
      rejectWithValue
    );
    return data;
  }
);

// Thunk for adding a customer
export const addCustomer = createAsyncThunk(
  "customersSlice/addCustomer",
  async (customer, { getState, rejectWithValue }) => {
    const { data: customers } = getState().customers;
    const lastCustomer = customers.reduce(
      (prev, curr) => {
        return prev.code > curr.code ? prev : curr;
      },
      { code: 0 }
    );
    const lastCode = lastCustomer ? lastCustomer.code : 0;
    const newCustomer = { ...customer, code: lastCode + 1 };

    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      },
      rejectWithValue
    );
    return data;
  }
);

// Thunk for deleting a customer
export const deleteCustomer = createAsyncThunk(
  "customersSlice/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/customers/${customerId}`,
      {
        method: "DELETE",
      },
      rejectWithValue
    );
    return customerId;
  }
);

// Thunk for editing a customer
export const editCustomer = createAsyncThunk(
  "customersSlice/editCustomer",
  async (customer, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/customers/${customer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      },
      rejectWithValue
    );
    return data;
  }
);

const customersSlice = createSlice({
  name: "customersSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Customer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit Customer
      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customersSlice.reducer;
