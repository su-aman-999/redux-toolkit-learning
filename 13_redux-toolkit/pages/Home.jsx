import React from "react";
import { useSelector } from "../react-redux";
import Product from "../components/Product";

export default function Home() {
  const productsList = useSelector((state) => state.products);
  
  //? access state
  //! useSelector((state) => console.log(state));

  return (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          id={id}
          title={title}
          rating={rating}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
}
