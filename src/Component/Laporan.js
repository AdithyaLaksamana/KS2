import React, { useState } from "react";
import "../Styles/testing.css";
import Grafik from "./Laporan_Grafik";
import Keuangan from "./Laporan_Keuangan";

function Laporan() {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="container">
      <input
        type="checkbox"
        id="check"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="check" className="button"></label>

      {/* Menampilkan halaman berdasarkan status checkbox */}
      {checked ? <Keuangan /> : <Grafik />}
    </div>
  );
}

export default Laporan;
