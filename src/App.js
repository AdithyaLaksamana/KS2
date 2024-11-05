import React from "react";
import "./App.css";
import Head from "./Component/Header";
import Footer from "./Component/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Grup from "./Component/Grup";
import Produk from "./Component/Produk";
import Laporan from "./Component/Laporan_Grafik";
import Info from "./Component/Info";
import Kategori from './Component/Kategori';
import Scanner from './Component/Scanner';
import LaporanGrafik from './Component/Laporan_Grafik';
import LaporanKeuangan from './Component/Laporan_Keuangan';

function App() {
  return (
    <Router>
      <div className="app">
        <Head />
        <Routes>
          <Route path="/" element={<Produk />} />
          <Route path="/grup" element={<Grup />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/info" element={<Info />} />
          <Route path="/grup/:groupName" element={<Kategori />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/grafik" element={<LaporanGrafik />} />
          <Route path="/keuangan" element={<LaporanKeuangan />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;