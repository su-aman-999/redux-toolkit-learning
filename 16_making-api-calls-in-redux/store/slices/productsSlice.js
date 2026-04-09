import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
    },
    fetchProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Someting went wronge!";
    },
    updateAllProducts: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
  },
});

export default slice.reducer;

export const { updateAllProducts, fetchProducts, fetchProductsError } =
  slice.actions;
