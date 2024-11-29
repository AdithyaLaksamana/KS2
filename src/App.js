import React, { useEffect } from "react";
import "./App.css";
import Head from "./Component/Header";
import Footer from "./Component/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Produk from "./Component/Produk";
import Grup from "./Component/Grup";
import Grup2 from "./Component/Grup2";
import Laporan from "./Component/Laporan";
import Info from "./Component/Info";
import Kategori from "./Component/Kategori";
import Scanner from "./Component/Scanner";
import AddProduk from "./Component/AddProduk";
import AddGrup from "./Component/AddGrup";

function App() {
  useEffect(() => {
  const bubbleContainer = document.querySelector(".background-bubbles");
    const numberOfBubbles = 15;
    const delayBetweenBubbles = 100;

    for (let i = 0; i < numberOfBubbles; i++) {
      setTimeout(() => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const size = Math.random() * 10 + 2;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        const leftPosition = Math.random() * 200;
        bubble.style.left = `${leftPosition}%`;

        const animationDuration = Math.random() * 10 + 4;
        bubble.style.animationDuration = `${animationDuration}s`;

        bubbleContainer.appendChild(bubble);
      }, i * delayBetweenBubbles);
    }
  }, []);

  return (
    <Router>
      <Head />
      <div className="app">
        <Routes>
          <Route path="/" element={<Produk />} />
          <Route path="/grup" element={<Grup />} />
          <Route path="/grup2" element={<Grup2 />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/info" element={<Info />} />
          <Route path="/grup/:groupName" element={<Kategori />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/add_produk" element={<AddProduk />} />
          <Route path="/add_grup" element={<AddGrup />} />
        </Routes>
        <div className="background-bubbles"></div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
