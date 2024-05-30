import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVendors = createAsyncThunk(
  "vendorsSlice/fetchVendors",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }
);

export const addVendor = createAsyncThunk(
  "vendorsSlice/addVendor",
  async (vendor, { getState }) => {
    const { data: vendors } = getState().vendors;
    const lastVendor = vendors.reduce(
      (prev, curr) => {
        return prev.code > curr.code ? prev : curr;
      },
      { code: 0 }
    );
    const lastCode = lastVendor ? lastVendor.code : 0;
    const newVendor = { ...vendor, code: lastCode + 1 };

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVendor),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }
);

export const deleteVendor = createAsyncThunk(
  "vendorsSlice/deleteVendor",
  async (vendorId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/${vendorId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return vendorId;
  }
);

export const editVendor = createAsyncThunk(
  "vendorsSlice/editVendor",
  async (vendor) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/${vendor.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendor),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
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
          (vendor) => vendor.id !== action.payload
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
          (vendor) => vendor.id === action.payload.id
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
