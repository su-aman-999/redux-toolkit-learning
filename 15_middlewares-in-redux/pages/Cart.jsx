import { useSelector } from "../react-redux";
import CartItem from "../components/CartItem";

export default function Cart() {
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(({ id, title, rating, price, image, quantity }) => (
          <CartItem
            key={id}
            id={id}
            title={title}
            price={price}
            quantity={quantity}
            image={image}
            rating={rating.rate}
          />
        ))}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
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
