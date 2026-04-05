import reducerCart from "./slices/cartSlice";
import reducerProducts from "./slices/productsSlice";
import reducerWishList from "./slices/wishListSlice";
import { configureStore } from "@reduxjs/toolkit";

/*
import { createStore, combineReducers } from "redux";

const reducer = combineReducers({
  products: reducerProducts,
  cartItems: reducerCart,
  wishList: reducerWishList,
});

? __REDUX_DEVTOOLS_EXTENSION__?.() → store enhancer to connect devtools
export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.(),
);
*/

export const store = configureStore({
  reducer: {
    products: reducerProducts,
    cartItems: reducerCart,
    wishList: reducerWishList,
  },
});
