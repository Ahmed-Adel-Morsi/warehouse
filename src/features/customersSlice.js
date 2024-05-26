import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customersSlice/fetchCustomers",
  async () => {
    let res = await fetch("http://localhost:9000/customers");
    let data = await res.json();
    return data;
  }
);

export const addCustomer = createAsyncThunk(
  "customersSlice/addCustomer",
  async (customer) => {
    let res = await fetch("http://localhost:9000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    let data = await res.json();
    return data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customersSlice/deleteCustomer",
  async (customerId) => {
    await fetch(`http://localhost:9000/customers/${customerId}`, {
      method: "DELETE",
    });
    return customerId;
  }
);

export const editCustomer = createAsyncThunk(
  "customersSlice/editCustomer",
  async (customer) => {
    await fetch(`http://localhost:9000/customers/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    return customer;
  }
);

const customersSlice = createSlice({
  initialState: [],
  name: "customersSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      return state.filter((customer) => customer.id !== action.payload);
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editCustomer.fulfilled, (state, action) => {
      const index = state.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
  },
});

export const getLastCustomer = (state) => {
  if (state.customers.length === 0) return null;
  const customers = state.customers || [];
  if (customers.length === 0) return null;
  return customers.reduce((prev, current) => {
    return prev.code > current.code ? prev : current;
  });
};

// export const {} = customersSlice.actions;
export default customersSlice.reducer;
