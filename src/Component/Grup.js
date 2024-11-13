import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Import axios
import "../Styles/Grup.css";

function Grup() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data kategori menggunakan Axios
  useEffect(() => {
    // Fungsi untuk mengambil data kategori
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        setCategories(response.data);
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
    <div className="grup">
      <div className="grupHeader">
        <Link to="/grup2">
          <button className="grupButton">grup</button>
        </Link>
        <h1 className="kategori">KATEGORI</h1>
      </div>
      <div className="grup-list">
        {categories.map((category) => (
          <Link key={category.id} to={`/grup/${category.name}`}>
            <div className="grup-card">
              <img src="/assets/images/aqua.png" alt={category.name} className="grup-image" />
              <h2>{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Grup;
