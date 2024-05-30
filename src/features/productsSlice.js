import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "productsSlice/addProduct",
  async (product) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "productsSlice/deleteProduct",
  async (productId) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return productId;
  }
);

export const editProduct = createAsyncThunk(
  "productsSlice/editProduct",
  async (product) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
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
        state.data = state.data.filter((product) => product.id !== action.payload);
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
        const index = state.data.findIndex((product) => product.id === action.payload.id);
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
