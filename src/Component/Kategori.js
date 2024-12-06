import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPen } from "@fortawesome/free-solid-svg-icons";

function Kategori() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {groupName} = useParams();
  const filteredProduk = items.filter((item) => item.category.toLowerCase() === groupName.toLowerCase());
  const navigate = useNavigate();

  const handleEdit = (itemId, categoryId) => {
    if (itemId){
      navigate('/add_produk', { state: { mode: 'edit', itemId: itemId} });
    } else {
      const matchedCategory = category.find(cat => cat.name.toLowerCase() === groupName.toLowerCase());
      if (matchedCategory) {
        navigate('/add_grup', { state: { mode: 'edit', categoryId: matchedCategory.id} });
      } else {
        console.log('Kategori tidak ditemukan');
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseItem = await axios.get('/api/item');
        setItems(responseItem.data);

        const responseCategory = await axios.get(`/api/category`);
        setCategory(responseCategory.data);

        setLoading(false);
      } catch (err) {
        setError('Gagal memuat kategori');
        setLoading(false);
      }
    };
    fetchCategories();
  }, [groupName]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="info">
      <div className="info-header">
        <button className="edit-category" onClick={() => handleEdit(category.id)}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <h1>{groupName}</h1>
      </div>
        <div className="info-list">
            {filteredProduk.sort((a, b) => a.amount - b.amount).map((item) => (
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
            ))}
        </div>
    </div>
  );
}

export default Kategori;