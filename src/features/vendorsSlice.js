import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVendors = createAsyncThunk(
  "vendorsSlice/fetchVendors",
  async () => {
    let res = await fetch("http://localhost:9000/vendors");
    let data = await res.json();
    return data;
  }
);

export const addVendor = createAsyncThunk(
  "vendorsSlice/addVendor",
  async (vendor) => {
    let res = await fetch("http://localhost:9000/vendors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor),
    });
    let data = await res.json();
    return data;
  }
);

export const deleteVendor = createAsyncThunk(
  "vendorsSlice/deleteVendor",
  async (vendorId) => {
    await fetch(`http://localhost:9000/vendors/${vendorId}`, {
      method: "DELETE",
    });
    return vendorId;
  }
);

export const editVendor = createAsyncThunk(
  "vendorsSlice/editVendor",
  async (vendor) => {
    await fetch(`http://localhost:9000/vendors/${vendor.id}`, {
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
      state.push(action.payload);
    });
    builder.addCase(editVendor.fulfilled, (state, action) => {
      const index = state.findIndex(
        (vendor) => vendor.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
  },
});

export const getLastVendor = (state) => {
  if (state.vendors.length === 0) return null;
  const vendors = state.vendors || [];
  if (vendors.length === 0) return null;
  return vendors.reduce((prev, current) => {
    return prev.code > current.code ? prev : current;
  });
};

// export const {} = vendorsSlice.actions;
export default vendorsSlice.reducer;
