import React from "react";
import "./Produk.css";

const products = [
    { name: "AQUA", description: "Air Mineral Botol 600ml", stock: 30, image: "/assets/images/aqua.png" },
    { name: "LAY'S", description: "Keripik Kentang 70 g", stock: 10, image: "/assets/images/aqua.png" },
    { name: "INDOMIE", description: "Mi Instan", stock: 19, image: "/assets/images/aqua.png" },
    { name: "KAPAL API", description: "Kopi Bubuk Sachet", stock: 12, image: "/assets/images/aqua.png" },
    { name: "RINSO", description: "Sabun Detergen", stock: 7, image: "/assets/images/aqua.png" },
    { name: "LUX", description: "Sabun Mandi Batang", stock: 14, image: "/assets/images/aqua.png" },
    { name: "SUNLIGHT", description: "Sabun Cuci Piring", stock: 26, image: "/assets/images/aqua.png" },
    { name: "Gulaku", description: "Gula Pasir", stock: 21, image: "/assets/images/aqua.png", grup: "Gula" },
    { name: "VIT", description: "Air Mineral Botol", stock: 20, image: "/assets/images/aqua.png" },
];

function Produk() {
  return (
    <div className="product-list">
      
        {products.map((product, index) => (

          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>  

            <div className="product-stock">
              <span>Stok</span>
              <strong>{product.stock}</strong>
            </div>

            <button className="edit-produk">
              <h2>  ⟩  </h2>
            </button>
          </div>
          
        ))}
    </div>
  );
}

export default Produk;