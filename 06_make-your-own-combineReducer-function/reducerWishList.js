export const WISHLIST_ADD_ITEM = "wishList/addItem";
export const WISHLIST_REMOVE_ITEM = "wishList/removeWishItem";

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
