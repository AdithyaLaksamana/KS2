import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Produk.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Produk() {
  const [items, setItems] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk *loading*
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  const navigate = useNavigate();

  // Fungsi untuk menangani edit produk
  const handleEdit = (itemId) => {
    navigate('/add_produk', { state: { mode: 'edit', itemId: itemId } });
  };

  // *Effect* untuk mengambil data produk dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/item');
        setItems(response.data); // Set data produk ke dalam state
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat produk'); // Set error jika gagal memuat
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Jika dalam proses *loading*
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika terdapat error
  if (error) {
    return <div>{error}</div>;
  }

  // Tampilan utama
  return (
    <div className="product-list">
      {!error && (
        <>
          {/* Tombol Tambah Produk */}
          <div className="New">
            <Link to="/add_produk">
              <div className="add-produk">
                <FontAwesomeIcon icon={faPlus} className="add-produk-icon" /> Tambah Produk
              </div>
            </Link>
          </div>

          {/* Daftar Produk */}
          {items.map((item) => (
            <div key={item.barcode} className="product-card">
              {/* Tampilkan gambar produk dengan base64 */}
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

              {/* Tombol Edit Produk */}
              <button className="edit-produk" onClick={() => handleEdit(item.id)}>
                <h2>⟩</h2>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Produk;
