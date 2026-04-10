import { useSelector } from "react-redux";
import Product from "../components/Product";

//selector import
import {
  getAllProducts,
  getProductLoadingState,
  getProductsError,
} from "../store/slices/productsSlice";

export default function Home() {
  //use selector
  const productsList = useSelector(getAllProducts);
  const isLoading = useSelector(getProductLoadingState);
  const error = useSelector(getProductsError);

  return isLoading ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          {/* Image */}
          <div
            style={{
              height: "150px",
              borderRadius: "8px",
              marginBottom: "10px",
              background:
                "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.2s infinite",
            }}
          />

          {/* Title */}
          <div
            style={{
              height: "15px",
              width: "80%",
              marginBottom: "8px",
              borderRadius: "5px",
              background:
                "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.2s infinite",
            }}
          />

          {/* Price */}
          <div
            style={{
              height: "15px",
              width: "40%",
              marginBottom: "10px",
              borderRadius: "5px",
              background:
                "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.2s infinite",
            }}
          />

          {/* Button */}
          <div
            style={{
              height: "30px",
              width: "100%",
              borderRadius: "5px",
              background:
                "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.2s infinite",
            }}
          />
        </div>
      ))}

      <style>
        {`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}
      </style>
    </div>
  ) : error ? (
    <h1 style={{ textAlign: "center" }}>{error}</h1>
  ) : (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, images }) => (
        <Product
          key={id}
          id={id}
          title={title}
          rating={rating}
          price={price}
          image={images[0]}
        />
      ))}
    </div>
  );
}
