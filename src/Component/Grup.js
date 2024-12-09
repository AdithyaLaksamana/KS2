import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Grup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSync, faPlus } from "@fortawesome/free-solid-svg-icons";

function Grup() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = ["#FF5733", "#3357FF", "red", "#33FF57", "#A133FF", "#33FFF2"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat kategori");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grup">
      <div className="grupHeader">
        <Link to="/grup2">
          <button className="viewButton">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </Link>
        <h1 className="kategori">KATEGORI</h1>
      </div>

      {error && (
        <div className="error-message">
          <h3>
            <button className="refresh" onClick={handleRefresh}>
              <FontAwesomeIcon icon={faSync} />
            </button>{" "}
            {error}
          </h3>
        </div>
      )}

      {!error && (
        <>
          <Link to="/add_grup">
            <div className="add-grup">
              <FontAwesomeIcon icon={faPlus} className="add-grup-icon" />
              Tambah Grup
            </div>
          </Link>
          <div className="grup-list">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/grup/${category.name}`}>
                <div
                  className="grup-card"
                  style={{ background: `linear-gradient(to bottom right, ${colors[index % colors.length]}, #ffffff)` }}
                >
                  <img src="/assets/images/aqua.png" alt={category.name} className="grup-image" />
                  <h2>{category.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Grup;
