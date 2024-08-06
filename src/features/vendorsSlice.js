import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";
import { toastFire } from "../utils/toastFire";

export const fetchVendors = createAsyncThunk(
  "vendorsSlice/fetchVendors",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/vendors`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

export const addVendor = createAsyncThunk(
  "vendorsSlice/addVendor",
  async (vendor, { getState, rejectWithValue }) => {
    const { token } = getState().auth;

    return await apiCall(
      `/vendors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(vendor),
      },
      rejectWithValue
    );
  }
);

export const deleteVendor = createAsyncThunk(
  "vendorsSlice/deleteVendor",
  async (vendorId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    await apiCall(
      `/vendors/${vendorId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
    return vendorId;
  }
);

export const editVendor = createAsyncThunk(
  "vendorsSlice/editVendor",
  async (vendor, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/vendors/${vendor._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(vendor),
      },
      rejectWithValue
    );
  }
);

const vendorsSlice = createSlice({
  name: "vendorsSlice",
  initialState: {
    loading: false,
    error: null,
    vendors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.vendors.unshift(action.payload);
        toastFire("success", `تم اضافة ${action.payload.name} بنجاح`);
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.vendors = state.vendors.filter(
          (vendor) => vendor._id !== action.payload
        );
        toastFire("success", `تم حذف المورد بنجاح`);
      })
      .addCase(editVendor.fulfilled, (state, action) => {
        const index = state.vendors.findIndex(
          (vendor) => vendor._id === action.payload._id
        );
        if (index !== -1) {
          state.vendors[index] = action.payload;
        }
        toastFire("success", `تم تعديل ${action.payload.name} بنجاح`);
      });
  },
});

export default vendorsSlice.reducer;
