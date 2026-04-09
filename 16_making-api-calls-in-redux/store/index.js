import { logger } from "./logger";
import reducerCart from "./slices/cartSlice";
import reducerProducts from "./slices/productsSlice";
import reducerWishList from "./slices/wishListSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    products: reducerProducts,
    cartItems: reducerCart,
    wishList: reducerWishList,
  },

  
});
