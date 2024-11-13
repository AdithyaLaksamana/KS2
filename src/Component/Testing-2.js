import React, { useEffect } from "react";
import "../Styles/testing.css";
import { useNavigate } from "react-router-dom";

function Testing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa apakah tombol sudah berada di posisi kanan
    const isChecked = sessionStorage.getItem("buttonChecked");
    if (isChecked === "true") {
      document.getElementById("check").checked = true;
    }
  }, []);


  const handleClick = () => {
    setTimeout(() => {
      sessionStorage.setItem("buttonChecked", "true"); // Simpan status posisi tombol
      navigate("/testing-2"); // Pindah halaman setelah animasi selesai
    }, 2500); // Durasi animasi
  };

  return (
    <div className="container page2">
      <input type="checkbox" id="check" onClick={handleClick} />
      <label htmlFor="check" className="button"></label>
    </div>
  );
}

export default Testing;
