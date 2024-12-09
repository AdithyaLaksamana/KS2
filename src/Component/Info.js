import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPen } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);;
  const navigate = useNavigate();

  const handleEdit = (itemId) => {
    navigate('/add_produk', { state: { mode: 'edit', itemId: itemId} });
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/item`);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat kategori');
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="info">
      <div className="info-header">
        <Link to="/add_grup">
        </Link>
        <h1>Kategori</h1>
      </div>
        <div className="info-list">
            {items.sort((a, b) => a.amount - b.amount).map((item) => (
              item.amount <= 30 && (
                <div key={item.id} className="product-card">
              <img
                src={`data:image/png;base64,${item.imageBase64}`} 
                alt={item.name}
                className="product-image"
              />
                  <div className="product-info">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className="product-stock">
                    <span>Stok</span>
                    <strong>{item.amount}</strong>
                  </div>
                  <button className="edit-produk" onClick={() => handleEdit(item.id)}>
                    <h2> ⟩ </h2>
                  </button>
                </div>
              )
            ))}
        </div>
    </div>
  );
}

export default Info;
