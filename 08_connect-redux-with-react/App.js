import React from "react";
import Product from "./components/Product";
import "./App.css";
import { useSelector } from "react-redux";

export default function App() {
  const productsList = useSelector((state) => state.products);

  return (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, image }) => {
        return (
          <Product
            key={id}
            title={title}
            price={price}
            rating={rating}
            image={image}
          />
        );
      })}
    </div>
  );
}
