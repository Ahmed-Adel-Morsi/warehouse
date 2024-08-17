import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../utils/apiCall";
import { toastFire } from "../utils/toastFire";

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
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
        toastFire("success", `تم اضافة ${action.payload.name} بنجاح`);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((product) => product._id !== action.payload);
        toastFire("success", `تم حذف الصنف بنجاح`);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default productsSlice.reducer;
