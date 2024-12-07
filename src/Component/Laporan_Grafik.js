
import React, { useEffect, useState } from "react";
import "../Styles/Laporan.css";
import "../Styles/Laporan_Keuangan.css";
import {Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

function Laporan_Grafik() {
  const [stokMasukData, setStokMasukData] = useState([]);
  const [stokKeluarData, setStokKeluarData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [logs, setLogs] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState(logs);

  useEffect(() => {
    let filtered = logs; 
    if (selectedProduct && selectedProduct !== "ALL") {
      filtered = filtered.filter((log) => log.item.id === parseInt(selectedProduct));
    }
  
    processData(filtered);
    setFilteredLogs(filtered);
    // console.log(filtered)
  }, [selectedProduct, logs]);

  useEffect(() => {
    fetch("http://localhost:8080/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("http://localhost:8080/api/item")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        filterItem(data);
      })
      .catch((error) => console.error("Error fetching items:", error));

    fetch("http://localhost:8080/api/item/log")
      .then((response) => response.json())
      .then((data) => {
        setLogs(data);
        filterLog(data);
      })
      .catch((error) => console.error("Error fetching item logs:", error));
  }, [selectedCategory]);

  const filterItem = () => {
    if (selectedCategory === "ALL") {
      return items;
    } else {
      return items.filter((item) => item.category === selectedCategory);
    }
  };

  const filterLog = (data) => {
    const filteredItems = filterItem();
    const itemIds = filteredItems.map((item) => item.id);
    let filteredLogs = data.filter((log) => itemIds.includes(log.item.id));
  };
  
  const processData = (filteredLogs) => {
    const masuk = new Array(12).fill(0);
    const keluar = new Array(12).fill(0);

    filteredLogs.forEach((log) => {
      const month = new Date(log.createdDate).getMonth();
      if (log.change === "PLUS") {
        masuk[month] += log.currentAmount - log.previousAmount;
      } else if (log.change === "MINUS") {
        keluar[month] += log.previousAmount - log.currentAmount;
      }
    });

    setStokMasukData(masuk);
    setStokKeluarData(keluar);
  };

  const dataMasuk = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Stok Masuk',
        data: stokMasukData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        fill: true,
        tension: 0.5,
      },
    ],
  };

  const dataKeluar = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Stok Keluar',
        data: stokKeluarData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
        fill: true,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 0,
        },
        onClick: null,
      },
    },
  };

  return (
    <div className="Laporan">
      <div className="FilterControls">
        <div className="filter-item">
          <label htmlFor="categorySelect">Kategori:</label>
          <select
            id="categorySelect"
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct(null);
            }}
          >
            <option value="ALL">Tampilkan Semua</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
            {selectedCategory !== "ALL" && (
              <label htmlFor="productSelect">Produk:</label>
            )}
            {selectedCategory !== "ALL" && (
              <select
                id="productSelect"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="ALL">Tampilkan Semua</option>
                {filterItem().map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </div>
      </div>

      <div className="stokMasuk">
        <h2>Stok Masuk</h2>
        <Line data={dataMasuk} options={options} />
      </div>
      <div className="stokKeluar">
        <h2>Stok Keluar</h2>
        <Line data={dataKeluar} options={options} />
      </div>
    </div>
  );
}

export default Laporan_Grafik;