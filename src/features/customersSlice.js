import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";
import { toastFire } from "../utils/toastFire";

export const fetchCustomers = createAsyncThunk(
  "customersSlice/fetchCustomers",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/customers`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

export const addCustomer = createAsyncThunk(
  "customersSlice/addCustomer",
  async (customer, { getState, rejectWithValue }) => {
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
      rejectWithValue
    );
  }
);

export const deleteCustomer = createAsyncThunk(
  "customersSlice/deleteCustomer",
  async (customerId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    await apiCall(
      `/customers/${customerId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
    return customerId;
  }
);

export const editCustomer = createAsyncThunk(
  "customersSlice/editCustomer",
  async (customer, { getState, rejectWithValue }) => {
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
      rejectWithValue
    );
  }
);

const customersSlice = createSlice({
  name: "customersSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        toastFire("success", `تم اضافة ${action.payload.name} بنجاح`);
        state.push(action.payload);
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        toastFire("success", `تم حذف العميل بنجاح`);
        return state.filter((customer) => customer._id !== action.payload);
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        toastFire("success", `تم تعديل ${action.payload.name} بنجاح`);
        const index = state.findIndex(
          (customer) => customer._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      });
  },
});

export default customersSlice.reducer;
