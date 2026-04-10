import { useDispatch } from "react-redux";
import { addCartItem } from "../store/slices/cartSlice";
import {
  addItemWishList,
  removeItemWishList,
} from "../store/slices/wishListSlice";
import { useState } from "react";

export default function Product({ id, title, rating, price, image }) {
  const [isWishItem, setIsWishItem] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="product">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <div className="title-container" style={{ color: "black" }}>
        <h3>
          <a href="#">{title}</a>
        </h3>
      </div>
      <div className="price-rating-container" tyle={{ color: "black" }}>
        <p className="rating" style={{ color: "black" }}>
          {+rating} ★ ★ ★ ★
        </p>
        <p className="price" style={{ color: "black" }}>
          ${price}
        </p>
      </div>
      <div className="cta-container">
        <button
          onClick={() => {
            dispatch(addCartItem({ id }));
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            if (isWishItem) {
              dispatch(removeItemWishList(id));
              setIsWishItem(false);
            } else {
              dispatch(addItemWishList({ id, title, rating, price, image }));
              setIsWishItem(true);
            }
          }}
          style={{
            backgroundColor: `${isWishItem ? "green" : "gray"}`,
            border: "1px solid black",
          }}
        >
          {isWishItem ? "Remove to Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
