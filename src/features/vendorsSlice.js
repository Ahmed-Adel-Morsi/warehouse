import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVendors = createAsyncThunk(
  "vendorsSlice/fetchVendors",
  async () => {
    let res = await fetch(`${process.env.API_BASE_URL}/vendors`);
    let data = await res.json();
    return data;
  }
);

export const addVendor = createAsyncThunk(
  "vendorsSlice/addVendor",
  async (vendor, { getState }) => {
    const vendors = getState().vendors;
    const lastVendor = vendors[vendors.length - 1];
    const lastCode = lastVendor ? lastVendor.code : 0;

    const newVendor = { ...vendor, code: lastCode + 1 };

    let res = await fetch(`${process.env.API_BASE_URL}/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVendor),
    });
    let data = await res.json();
    return data;
  }
);

export const deleteVendor = createAsyncThunk(
  "vendorsSlice/deleteVendor",
  async (vendorId) => {
    await fetch(`${process.env.API_BASE_URL}/vendors/${vendorId}`, {
      method: "DELETE",
    });
    return vendorId;
  }
);

export const editVendor = createAsyncThunk(
  "vendorsSlice/editVendor",
  async (vendor) => {
    await fetch(`${process.env.API_BASE_URL}/vendors/${vendor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor),
    });
    return vendor;
  }
);

const vendorsSlice = createSlice({
  initialState: [],
  name: "vendorsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteVendor.fulfilled, (state, action) => {
      return state.filter((vendor) => vendor.id !== action.payload);
    });
    builder.addCase(addVendor.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(editVendor.fulfilled, (state, action) => {
      return state.map((vendor) =>
        vendor.id === action.payload.id ? action.payload : vendor
      );
    });
  },
});

export default vendorsSlice.reducer;
