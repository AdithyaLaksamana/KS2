import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Produk.css";
import { Link, useNavigate} from 'react-router-dom';

function Produk() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (itemId) => {
    navigate('/add_produk', { state: { mode: 'edit', itemId: itemId} });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/item');
        setItems(response.data);
        setLoading(false);
        console.log(response.data);
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


  const handleAddClick = () => {
    setShowOptions(!showOptions); // Toggle visibilitas daftar
  };

  return (
    <div className="product-list">
      <div className="New">
        <button onClick={handleAddClick}>New</button>
        {showOptions && (
        <div className="addButton">
          <Link to='/add_produk'><button className="addProduk"><h2> Tambahakan Produk </h2></button></Link>
          <Link to='/add_grup'><button className="adGroup"><h2> Tambahkan Grup </h2></button></Link>
        </div>
        )}
      </div>

      {items.map((item) => (

        <div key={item.id} className="product-card">
          <img src={item.image} alt={item.name} className="product-image" />
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
  );
}

export default Produk;
