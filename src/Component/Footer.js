import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/"><button className="produk-button">Produk</button></Link>
      <Link to="/grup"><button className="grup-button">Grup</button></Link>
      <Link to="/scanner"><button className="scan-button">SCAN</button></Link>
      <Link to="/laporan"><button className="laporan-button">Laporan</button></Link>
      <Link to="/info"><button className="info-button">Info</button></Link>
    </footer>
  );
}

export default Footer;
