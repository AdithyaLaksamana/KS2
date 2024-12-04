import React, { useEffect, useState } from "react";
import "../Styles/Laporan.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

function Laporan_Grafik() {
  const [stokMasukData, setStokMasukData] = useState([]);
  const [stokKeluarData, setStokKeluarData] = useState([]);

  useEffect(() => {
    // Fetch data dari API
    fetch("http://localhost:8080/api/item/log") // Pastikan URL ini cocok dengan controller Anda
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => processData(data))
    .catch((error) => console.error("Error fetching item logs:", error));  
  }, []);

  const processData = (logs) => {
    const masuk = new Array(12).fill(0);
    const keluar = new Array(12).fill(0);

    logs.forEach((log) => {
      const month = new Date(log.createdDate).getMonth(); // Dapatkan bulan dari log

      if (log.change === "PLUS") {
        masuk[month] += log.currentAmount - log.previousAmount;
      } else if (log.change === "MINUS") {
        keluar[month] += log.previousAmount - log.currentAmount;
      }
    });

    setStokMasukData(masuk);
    setStokKeluarData(keluar);
  };

  // Data untuk grafik Stok Masuk
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

  // Data untuk grafik Stok Keluar
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

  // Konfigurasi opsi grafik
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
