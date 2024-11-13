import React from 'react';
import "./App.css";
import Head from "./Component/Header";
import Footer from "./Component/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Produk from "./Component/Produk";
import Grup from "./Component/Grup";
import Grup2 from "./Component/Grup2";
import Laporan from "./Component/Laporan";
import Info from "./Component/Info";
import Kategori from './Component/Kategori';
import Scanner from './Component/Scanner';
import AddProduk from './Component/AddProduk';
import AddGrup from './Component/AddGrup';

function App() {
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
      </div>
      <Footer />
      <div>
</div>
    </Router>
  );
}

export default App;