import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

//! Import Selector
import {
  getAllCartItems,
  getCartError,
  getCartLoadingState,
} from "../store/slices/cartSlice";

export default function Cart() {
  //! Use Selector
  const isLoading = useSelector(getCartLoadingState);
  const error = useSelector(getCartError);
  const cartItems = useSelector(getAllCartItems);

  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : error ? (
    <sh2 style={{ textAlign: "center" }}>{error}</sh2>
  ) : (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(({ id, quantity, thumbnail, rating, price, title }) => (
          <CartItem
            key={Math.random()}
            id={id}
            quantity={quantity}
            image={thumbnail}
            rating={rating}
            price={price}
            title={title}
          />
        ))}
        <div className="cart-header cart-item-container">
          <div className="total">
            $
            {cartItems.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.quantity * currentValue.price,
              0,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
