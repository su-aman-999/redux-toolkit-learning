import React from "react";
import WishlistItem from "../components/WishlistItem";
import { useSelector } from "react-redux";

export default function WishList() {
  const productsList = useSelector((state) => state.wishList);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "48px",
        gap: "24px",
      }}
    >
      {productsList.map(
        ({ id, title, price, description, category, image, rating }) => (
          <WishlistItem
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ),
      )}
    </div>
  );
}
