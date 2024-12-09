import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Produk.css";
import { Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Produk() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (itemId) => {
    navigate('/add_produk', { state: { mode: 'edit', itemId: itemId} });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/item`);
        setItems(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError('Gagal memuat produk');
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      {!error && (
        <>
          <div className="New">
            <Link to="/add_produk">
              <div className="add-produk">
                <FontAwesomeIcon icon={faPlus} className="add-produk-icon" /> Tambah Produk
              </div>
            </Link>
          </div>

          {items.map((item) => (
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
        </>
      )}
    </div>
  );
}

export default Produk;
