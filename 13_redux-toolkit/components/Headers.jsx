import { Link } from "react-router";
import { useSelector } from "../react-redux";

const cart = new URL(
  "../assets/cart-large-minimalistic-svgrepo-com.svg",
  import.meta.url,
);
const heart = new URL("../assets/heart-svgrepo-com.svg", import.meta.url);

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems);
  const wishList = useSelector((state) => state.wishList);

  const cartItemsLength = cartItems.reduce(
    (accumlator, currentValue) => accumlator + currentValue.quantity,
    0,
  );

  return (
    <>
      <header>
        <div className="header-contents">
          <h1>
            <Link to="/" style={{ color: "black" }}>
              Shopee
            </Link>
          </h1>

          <div>
            <Link className="cart-icon" to="/wishlist">
              <img src={heart} alt="cart icon" width="30px" />

              <div className="cart-items-count">{wishList.length}</div>
            </Link>

            <Link className="cart-icon" to="/cart">
              <div className="cart-items-count">{cartItemsLength}</div>
              <img src={cart} alt="cart icon" width="30px" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
