/*
? ⟨⟨⟨--- DUCS PATTERN ---⟩⟩⟩
import { produce } from "immer";

! Action Type
export const CART_ADD_ITEM = "cart/addItem";
export const CART_REMOVE_ITEM = "cart/removeItem";
export const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
export const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

! Action Creaters
export function increaseCartItemQuantity(id) {
  return { type: CART_ITEM_INCREASE_QUANTITY, payload: { id } };
}
export function decreaseCartItemQuantity(id) {
  return { type: CART_ITEM_DECREASE_QUANTITY, payload: { id } };
}
export function addCartItem(productData) {
  return { type: CART_ADD_ITEM, payload: productData };
}
export function removeCartItem(id) {
  return { type: CART_REMOVE_ITEM, payload: { id } };
}

! Reducer
export default function reducerCart(originalState = [], action) {
  //! ImmerJS and Immutating
  return produce(originalState, (state) => {
    const existingItemIndex = state.findIndex(
      (item) => item.id === action.payload.id,
    );

    switch (action.type) {
      case CART_ADD_ITEM:
        if (existingItemIndex !== -1) {
          state[existingItemIndex].quantity += 1;
        } else {
          state.push({ ...action.payload, quantity: 1 });
        }
        break;

      case CART_REMOVE_ITEM:
        state.splice(existingItemIndex, 1);
        break;

      case CART_ITEM_INCREASE_QUANTITY:
        state[existingItemIndex].quantity += 1;
        break;

      case CART_ITEM_DECREASE_QUANTITY:
        if (state[existingItemIndex].quantity > 1)
          state[existingItemIndex].quantity -= 1;
        else state.splice(existingItemIndex, 1);
    }
    return state;
  });
}
*/

import { createSlice } from "@reduxjs/toolkit";

//Find Index Function
const findItemIndex = (state, action) =>
  state.findIndex((item) => item.id === action.payload.id);

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

export const {
  addCartItem,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = slice.actions;

console.log(slice);

export default slice.reducer;
