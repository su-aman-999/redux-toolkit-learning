import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadAllProducts,
  fetchProducts,
  fetchProductsError,
} from "../store/slices/productsSlice";
import {
  fetchCartItems,
  loadCartItems,
  fetchCartItemsError,
} from "../store/slices/cartSlice";
import { fetchData } from "../store/middleware/api";

const cart = new URL(
  "../assets/cart-large-minimalistic-svgrepo-com.svg",
  import.meta.url,
);
const heart = new URL("../assets/heart-svgrepo-com.svg", import.meta.url);

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const wishList = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(
      fetchData({
        url: "https://dummyjson.com/products",
        onStart: fetchProducts().type,
        onSuccess: loadAllProducts().type,
        onError: fetchProductsError().type,
      }),
    );

    dispatch(
      fetchData({
        url: "https://dummyjson.com/carts/15",
        onStart: fetchCartItems().type,
        onSuccess: loadCartItems().type,
        onError: fetchCartItemsError().type,
      }),
    );
  }, []);

  const cartItemsLength = cartItems.list?.reduce(
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
