import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";
import { toastFire } from "../utils/toastFire";

export const fetchCustomers = createAsyncThunk(
  "customersSlice/fetchCustomers",
  async (_, { getState, ...thunkApi }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/customers`,
      {
        headers: {
          Authorization: token,
        },
      },
      thunkApi,
    );
  },
);

export const addCustomer = createAsyncThunk(
  "customersSlice/addCustomer",
  async (customer, { getState, ...thunkApi }) => {
    const { token } = getState().auth;

    return await apiCall(
      `/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(customer),
      },
      thunkApi,
    );
  },
);

export const deleteCustomer = createAsyncThunk(
  "customersSlice/deleteCustomer",
  async (customerId, { getState, ...thunkApi }) => {
    const { token } = getState().auth;
    await apiCall(
      `/customers/${customerId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
      thunkApi,
    );
    return customerId;
  },
);

export const editCustomer = createAsyncThunk(
  "customersSlice/editCustomer",
  async (customer, { getState, ...thunkApi }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/customers/${customer._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(customer),
      },
      thunkApi,
    );
  },
);

const customersSlice = createSlice({
  name: "customersSlice",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
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
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
        toastFire("success", `تم اضافة ${action.payload.name} بنجاح`);
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (customer) => customer._id !== action.payload,
        );
        toastFire("success", `تم حذف العميل بنجاح`);
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (customer) => customer._id === action.payload._id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        toastFire("success", `تم تعديل ${action.payload.name} بنجاح`);
      });
  },
});

export default customersSlice.reducer;
