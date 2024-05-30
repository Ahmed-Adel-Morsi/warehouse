import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customersSlice/fetchCustomers",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/customers`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }
);

export const addCustomer = createAsyncThunk(
  "customersSlice/addCustomer",
  async (customer, { getState }) => {
    const { data: customers } = getState().customers;
    const lastCustomer = customers.reduce(
      (prev, curr) => {
        return prev.code > curr.code ? prev : curr;
      },
      { code: 0 }
    );
    const lastCode = lastCustomer ? lastCustomer.code : 0;
    const newCustomer = { ...customer, code: lastCode + 1 };

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customersSlice/deleteCustomer",
  async (customerId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/customers/${customerId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return customerId;
  }
);

export const editCustomer = createAsyncThunk(
  "customersSlice/editCustomer",
  async (customer) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/customers/${customer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
