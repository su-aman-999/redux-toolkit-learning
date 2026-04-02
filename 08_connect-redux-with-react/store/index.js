import { createStore, combineReducers } from "redux";

import reducerCart, {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  addCartItem,
  removeCartItem,
} from "./reducerCart";

import reducerProducts from "./reducerProducts";

import reducerWishList, {
  addItemWishList,
  removeItemWishList,
} from "./reducerWishList";

const reducers = combineReducers({
  products: reducerProducts,
  cartItems: reducerCart,
  wishList: reducerWishList,
});

//? __REDUX_DEVTOOLS_EXTENSION__?.() → store enhancer
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__?.(),
);

/*
store.dispatch(addCartItem(1, 10));
store.dispatch(addCartItem(4));
store.dispatch(addCartItem(7));
store.dispatch(addCartItem(9));

store.dispatch(removeCartItem(4));

store.dispatch(increaseCartItemQuantity(1));
store.dispatch(increaseCartItemQuantity(1));
store.dispatch(increaseCartItemQuantity(1));

store.dispatch(decreaseCartItemQuantity(1));
store.dispatch(decreaseCartItemQuantity(1));
store.dispatch(decreaseCartItemQuantity(1));
store.dispatch(decreaseCartItemQuantity(1));

store.dispatch(addItemWishList(6));
store.dispatch(addItemWishList(10));
store.dispatch(addItemWishList(1));
store.dispatch(removeItemWishList(6));
*/
