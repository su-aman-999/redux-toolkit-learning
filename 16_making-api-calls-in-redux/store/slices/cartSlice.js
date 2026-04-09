//Find Index Function
const findItemIndex = (state, action) =>
  state.findIndex((item) => item.id === action.payload.id);

//! createSlice
import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },

  reducers: {
    fetchCartItems(state) {
      state.loading = true;
    },
    fetchCartItemsError(state) {
      state.loading = false;
      state.error = action.payload || "Something went wornge!";
    },

    loadCartItems(state, action) {
      state.loading = false;
      state.list = action.payload;
    },

    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },

    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },

    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (state[existingItemIndex].quantity > 1) {
        state.list[existingItemIndex].quantity -= 1;
      } else {
        state.list.splice(existingItemIndex, 1);
      }
    },
  },
});

//! Action Creator
export const {
  fetchCartItems,
  loadCartItems,
  addCartItem,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = slice.actions;

//! Reucers
export default slice.reducer;
