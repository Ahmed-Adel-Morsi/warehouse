import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/products`,
      {
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
  }
);

// Thunk for adding a product
export const addProduct = createAsyncThunk(
  "productsSlice/addProduct",
  async (product, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(product),
      },
      rejectWithValue
    );
  }
);

// Thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "productsSlice/deleteProduct",
  async (productId, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    await apiCall(
      `/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
      rejectWithValue
    );
    return productId;
  }
);

// Thunk for editing a product
export const editProduct = createAsyncThunk(
  "productsSlice/editProduct",
  async (product, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return await apiCall(
      `/products/${product._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(product),
      },
      rejectWithValue
    );
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
