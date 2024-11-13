import React from "react";
import "../Styles/Laporan.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

// Data dalam grafik
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Sales',
      data: [1, 5, 25, 125, 625, 3125, 1562, 781, 390, 195, 976, -488],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
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



function Laporan_Grafik() {
  return (
    <div className="Laporan">
      <div className="stokMasuk">
        <h2>Stok Masuk</h2>
        <Line data={data} options={options} />
      </div>
      <div className="stokKeluar">
        <h2>Stok Keluar</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );  
};

export default Laporan_Grafik;
