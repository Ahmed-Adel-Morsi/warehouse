import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (_, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/products`,
      undefined,
      rejectWithValue
    );
    return data;
  }
);

// Thunk for adding a product
export const addProduct = createAsyncThunk(
  "productsSlice/addProduct",
  async (product, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
      rejectWithValue
    );
    return data;
  }
);

// Thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "productsSlice/deleteProduct",
  async (productId, { rejectWithValue }) => {
    await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`,
      {
        method: "DELETE",
      },
      rejectWithValue
    );
    return productId;
  }
);

// Thunk for editing a product
export const editProduct = createAsyncThunk(
  "productsSlice/editProduct",
  async (product, { rejectWithValue }) => {
    const data = await apiCall(
      `${process.env.REACT_APP_API_BASE_URL}/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
      rejectWithValue
    );
    return data;
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
          (product) => product.id !== action.payload
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
          (product) => product.id === action.payload.id
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
