import React from "react";
import "./App.css";
import Head from "./Component/Header";
import Footer from "./Component/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Grup from "./Component/Grup";
import Produk from "./Component/Produk";
import Laporan from "./Component/Grafik-Laporan";
import Info from "./Component/Info";
import Kategori from './Component/Kategori';
import Scanner from './Component/Scanner';

function App() {
  return (
    <Router>
      <div className="app">
        {/* <Head /> */}
        <Routes>
          <Route path="/" element={<Produk />} />
          <Route path="/grup" element={<Grup />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/info" element={<Info />} />
          <Route path="/grup/:groupName" element={<Kategori />} />
          <Route path="/scanner" element={<Scanner />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


// import './App.css';
// import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
// import Barscan from './Component/Scanner'

// function App() {
//   return (
//         <Router>
//           <Routes>
//             <Route path="/barcode_scanner" element={<Barscan />} />
//           </Routes>
//         </Router>
//   );
// }

// export default App;