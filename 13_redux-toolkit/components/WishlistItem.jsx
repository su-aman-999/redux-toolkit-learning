import React from "react";

function WishlistItem({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) {
  return (
    <div style={{ maxWidth: "240px", border: "2px solid black", borderRadius:"12px", overflow:"hidden" }}>
      <div
        style={{
          backgroundColor: "white",
          height: "240px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%" }}
        />
      </div>


      <div style={{ padding: "12px 20px", backgroundColor:"black" }}>
        <h2 style={{ fontSize: "16px", marginBottom: "2px" }}>{title}</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2px",
          }}
        >
          <p style={{ fontSize: "12px", marginBottom: "1px" }}>${price}</p>
          <p style={{ fontSize: "12px", marginBottom: "1px" }}>
            {rating.rate}★ ★ ★ ★
          </p>
        </div>
        <p style={{ fontSize: "12px", margin: "2px" }}>{description}</p>
      </div>
    </div>
  );
}

export default WishlistItem;
