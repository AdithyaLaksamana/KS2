import React from "react";
import { useParams } from 'react-router-dom';

const products = [
    { name: "AQUA", description: "Air Mineral Botol 600ml", stock: 30, image: "/assets/images/aqua.png", grup: "Air Mineral" },
    { name: "AQUA", description: "Air Mineral Botol 600ml", stock: 30, image: "/assets/images/aqua.png", grup: "Air Mineral" },
    { name: "AQUA", description: "Air Mineral Botol 600ml", stock: 30, image: "/assets/images/aqua.png", grup: "Air Mineral" },
    { name: "AQUA", description: "Air Mineral Botol 600ml", stock: 30, image: "/assets/images/aqua.png", grup: "Air Mineral" },
    { name: "LAY'S", description: "Keripik Kentang 70 g", stock: 10, image: "/assets/images/aqua.png", grup: "Snack" },
    { name: "LAY'S", description: "Keripik Kentang 70 g", stock: 10, image: "/assets/images/aqua.png", grup: "Snack" },
    { name: "LAY'S", description: "Keripik Kentang 70 g", stock: 10, image: "/assets/images/aqua.png", grup: "Snack" },
    { name: "LAY'S", description: "Keripik Kentang 70 g", stock: 10, image: "/assets/images/aqua.png", grup: "Snack" },
    { name: "INDOMIE", description: "Mi Instan", stock: 19, image: "/assets/images/aqua.png", grup: "Mie Instan" },
    { name: "INDOMIE", description: "Mi Instan", stock: 19, image: "/assets/images/aqua.png", grup: "Mie Instan" },
    { name: "INDOMIE", description: "Mi Instan", stock: 19, image: "/assets/images/aqua.png", grup: "Mie Instan" },
    { name: "INDOMIE", description: "Mi Instan", stock: 19, image: "/assets/images/aqua.png", grup: "Mie Instan" },
    { name: "KAPAL API", description: "Kopi Bubuk Sachet", stock: 12, image: "/assets/images/aqua.png", grup: "Minuman Sachet" },
    { name: "KAPAL API", description: "Kopi Bubuk Sachet", stock: 12, image: "/assets/images/aqua.png", grup: "Minuman Sachet" },
    { name: "KAPAL API", description: "Kopi Bubuk Sachet", stock: 12, image: "/assets/images/aqua.png", grup: "Minuman Sachet" },
    { name: "KAPAL API", description: "Kopi Bubuk Sachet", stock: 12, image: "/assets/images/aqua.png", grup: "Minuman Sachet" },
    { name: "RINSO", description: "Sabun Detergen", stock: 7, image: "/assets/images/aqua.png", grup: "Sabun Detergen" },
    { name: "RINSO", description: "Sabun Detergen", stock: 7, image: "/assets/images/aqua.png", grup: "Sabun Detergen" },
    { name: "RINSO", description: "Sabun Detergen", stock: 7, image: "/assets/images/aqua.png", grup: "Sabun Detergen" },
    { name: "RINSO", description: "Sabun Detergen", stock: 7, image: "/assets/images/aqua.png", grup: "Sabun Detergen" },
    { name: "LUX", description: "Sabun Mandi Batang", stock: 14, image: "/assets/images/aqua.png", grup: "Sabun Mandi" },
    { name: "LUX", description: "Sabun Mandi Batang", stock: 14, image: "/assets/images/aqua.png", grup: "Sabun Mandi" },
    { name: "LUX", description: "Sabun Mandi Batang", stock: 14, image: "/assets/images/aqua.png", grup: "Sabun Mandi" },
    { name: "LUX", description: "Sabun Mandi Batang", stock: 14, image: "/assets/images/aqua.png", grup: "Sabun Mandi" },
    { name: "SUNLIGHT", description: "Sabun Cuci Piring", stock: 26, image: "/assets/images/aqua.png", grup: "Sabun Cuci Piring" },
    { name: "SUNLIGHT", description: "Sabun Cuci Piring", stock: 26, image: "/assets/images/aqua.png", grup: "Sabun Cuci Piring" },
    { name: "SUNLIGHT", description: "Sabun Cuci Piring", stock: 26, image: "/assets/images/aqua.png", grup: "Sabun Cuci Piring" },
    { name: "SUNLIGHT", description: "Sabun Cuci Piring", stock: 26, image: "/assets/images/aqua.png", grup: "Sabun Cuci Piring" },
    { name: "Gulaku", description: "Gula Pasir", stock: 21, image: "/assets/images/aqua.png", grup: "Gula" },
    { name: "Gulaku", description: "Gula Pasir", stock: 21, image: "/assets/images/aqua.png", grup: "Gula" },
    { name: "Gulaku", description: "Gula Pasir", stock: 21, image: "/assets/images/aqua.png", grup: "Gula" },
    { name: "Gulaku", description: "Gula Pasir", stock: 21, image: "/assets/images/aqua.png", grup: "Gula" },
    { name: "VIT", description: "Air Mineral Botol", stock: 20, image: "/assets/images/aqua.png", grup: "Minuman" },
    { name: "VIT", description: "Air Mineral Botol", stock: 20, image: "/assets/images/aqua.png", grup: "Minuman" },
    { name: "VIT", description: "Air Mineral Botol", stock: 20, image: "/assets/images/aqua.png", grup: "Minuman" },
    { name: "VIT", description: "Air Mineral Botol", stock: 20, image: "/assets/images/aqua.png", grup: "Minuman" },
];

function Kategori() {
    const { groupName } = useParams();
    console.log("Group Name:", groupName);  // Debugging
    const filteredProduk = products.filter((product) => product.grup.toLowerCase() === groupName.toLowerCase());
    console.log("Filtered Products:", filteredProduk); 
    
    return (
        <div className="info">
            <h1>{groupName}</h1>
            <div className="info-list">
                {filteredProduk.sort((a, b) => a.stock - b.stock).map((product, index) => (
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
                            <h2>⟩</h2>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Kategori;
