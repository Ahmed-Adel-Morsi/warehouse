import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";

// Thunk for fetching vendors
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

// Thunk for adding a vendor
export const addVendor = createAsyncThunk(
  "vendorsSlice/addVendor",
  async (vendor, { getState, rejectWithValue }) => {
    const { token } = getState().auth;

    const data = await apiCall(
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
    return data;
  }
);

// Thunk for deleting a vendor
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

// Thunk for editing a vendor
export const editVendor = createAsyncThunk(
  "vendorsSlice/editVendor",
  async (vendor, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    const data = await apiCall(
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
    return data;
  }
);

const vendorsSlice = createSlice({
  name: "vendorsSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Vendors
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Vendor
      .addCase(addVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Vendor
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (vendor) => vendor._id !== action.payload
        );
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit Vendor
      .addCase(editVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVendor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (vendor) => vendor._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vendorsSlice.reducer;
