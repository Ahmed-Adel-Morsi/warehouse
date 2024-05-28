import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customersSlice/fetchCustomers",
  async () => {
    let res = await fetch(
      `https://api-fmnr0krwx-ahmed-adel-morsis-projects.vercel.app/api/customers`
    );
    let data = await res.json();
    return data;
  }
);

export const addCustomer = createAsyncThunk(
  "customersSlice/addCustomer",
  async (customer, { getState }) => {
    const customers = getState().customers;
    const lastCustomer = customers[customers.length - 1];
    const lastCode = lastCustomer ? lastCustomer.code : 0;

    const newCustomer = { ...customer, code: lastCode + 1 };

    let res = await fetch(
      `https://api-fmnr0krwx-ahmed-adel-morsis-projects.vercel.app/api/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      }
    );
    let data = await res.json();
    return data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customersSlice/deleteCustomer",
  async (customerId) => {
    await fetch(
      `https://api-fmnr0krwx-ahmed-adel-morsis-projects.vercel.app/api/customers/${customerId}`,
      {
        method: "DELETE",
      }
    );
    return customerId;
  }
);

export const editCustomer = createAsyncThunk(
  "customersSlice/editCustomer",
  async (customer) => {
    await fetch(
      `https://api-fmnr0krwx-ahmed-adel-morsis-projects.vercel.app/api/customers/${customer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    );
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
      return [...state, action.payload];
    });
    builder.addCase(editCustomer.fulfilled, (state, action) => {
      return state.map((customer) =>
        customer.id === action.payload.id ? action.payload : customer
      );
    });
  },
});

export default customersSlice.reducer;
