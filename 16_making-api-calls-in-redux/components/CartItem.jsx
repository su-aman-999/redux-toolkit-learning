import { useDispatch } from "react-redux";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "../store/slices/cartSlice";

export default function CartItem({
  id,
  quantity,
  image,
  rating,
  price,
  title,
}) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={image} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button
          onClick={() => {
            dispatch(decreaseCartItemQuantity({ id }));
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => {
            dispatch(increaseCartItemQuantity({ id }));
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            dispatch(removeCartItem({ id }));
          }}
        >
          Remove
        </button>
      </div>
      <div className="item-total">${quantity * price}</div>
    </div>
  );
}
