import myCreateSlice from "../../redux-toolkit";

//Find Index Function
const findItemIndex = (state, action) =>
  state.findIndex((item) => item.id === action.payload.id);

/*//! createSlice
import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.splice(existingItemIndex, 1);
    },

    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state[existingItemIndex].quantity += 1;
    },

    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (state[existingItemIndex].quantity > 1) {
        state[existingItemIndex].quantity -= 1;
      } else {
        state.splice(existingItemIndex, 1);
      }
    },
  },
});
*/

//! myCreateSlice
const mySlice = myCreateSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.splice(existingItemIndex, 1);
    },

    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state[existingItemIndex].quantity += 1;
    },

    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (state[existingItemIndex].quantity > 1) {
        state[existingItemIndex].quantity -= 1;
      } else {
        state.splice(existingItemIndex, 1);
      }
    },
  },
});

/*//! Action Creator
export const {
  addCartItem,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = slice.actions;
*/

//! My Action Type
export const {
  addCartItem,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = mySlice.actions;

//! Reucers
// export default slice.reducer;

//! My Reducer
export default mySlice.reducer;
