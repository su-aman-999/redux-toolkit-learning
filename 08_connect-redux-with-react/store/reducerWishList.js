//? =|::: DUCS PATTERN :::|=
//! Action Type
export const WISHLIST_ADD_ITEM = "wishList/addItem";
export const WISHLIST_REMOVE_ITEM = "wishList/removeWishItem";

//! Action Creators
export function addItemWishList(id) {
  return { type: WISHLIST_ADD_ITEM, payload: { id } };
}

export function removeItemWishList(id) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { id } };
}

//! Reducer
export default function reducerWishList(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      return state.includes(action.payload.id)
        ? [...state]
        : [...state, action.payload.id];

    case WISHLIST_REMOVE_ITEM:
      return state.filter((wishItemId) => wishItemId != action.payload.id);

    default:
      return state;
  }
}
