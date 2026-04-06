//? =|::: DUCS PATTERN :::|=
//! Action Type
export const WISHLIST_ADD_ITEM = "wishList/addItem";
export const WISHLIST_REMOVE_ITEM = "wishList/removeWishItem";

//! Action Creators
export function addItemWishList(product) {
  return { type: WISHLIST_ADD_ITEM, payload: product };
}

export function removeItemWishList(id) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { id } };
}

//! Reducer
export default function reducerWishList(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      console.log(state);

      return state.find((product) => product.id === action.payload.id)
        ? [...state]
        : [...state, action.payload];

    case WISHLIST_REMOVE_ITEM:
      return state.filter((product) => product.id != action.payload.id);

    default:
      return state;
  }
}
