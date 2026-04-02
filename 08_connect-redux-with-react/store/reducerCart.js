//? =|::: DUCS PATTERN :::|=

//! Action Type
export const CART_ADD_ITEM = "cart/addItem";
export const CART_REMOVE_ITEM = "cart/removeItem";
export const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
export const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

//! Action Creaters
export function increaseCartItemQuantity(id) {
  return { type: CART_ITEM_INCREASE_QUANTITY, payload: { id } };
}

export function decreaseCartItemQuantity(id) {
  return { type: CART_ITEM_DECREASE_QUANTITY, payload: { id } };
}

export function addCartItem(id, quantity = 1) {
  return { type: CART_ADD_ITEM, payload: { id, quantity } };
}

export function removeCartItem(id) {
  return { type: CART_REMOVE_ITEM, payload: { id } };
}

//! Reducer
export default function reducerCart(state = [], action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return [...state, action.payload];

    case CART_REMOVE_ITEM:
      return state.filter((cartItem) => cartItem.id !== action.payload.id);

    case CART_ITEM_INCREASE_QUANTITY:
      return state.map((cartItem) => {
        if (cartItem.id === action.payload.id)
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        return cartItem;
      });

    case CART_ITEM_DECREASE_QUANTITY:
      return state
        .map((cartItem) => {
          if (cartItem.id === action.payload.id)
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity >= 1);

    default:
      return state;
  }
}
