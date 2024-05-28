import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async () => {
    let res = await fetch(
      `https://warehouse-api-ly5q.onrender.com/api/products`
    );
    let data = await res.json();
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "productsSlice/addProduct",
  async (product) => {
    let res = await fetch(
      `https://warehouse-api-ly5q.onrender.com/api/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    let data = await res.json();
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "productsSlice/deleteProduct",
  async (productId) => {
    await fetch(
      `https://warehouse-api-ly5q.onrender.com/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    return productId;
  }
);

export const editProduct = createAsyncThunk(
  "productsSlice/editProduct",
  async (product) => {
    await fetch(
      `https://warehouse-api-ly5q.onrender.com/api/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    return product;
  }
);

const productsSlice = createSlice({
  initialState: [],
  name: "productsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
  },
});

export default productsSlice.reducer;
