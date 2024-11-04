import React from "react";
import { Link } from "react-router-dom";
import "./Grup.css";

const groups = [
  { id: 1, name: "AIR MINERAL", image: "/assets/images/aqua.png" },
  { id: 2, name: "SNACK", image: "/assets/images/aqua.png" },
  { id: 3, name: "MIE INSTAN", image: "/assets/images/aqua.png" },
  { id: 4, name: "MINUMAN SACHET", image: "/assets/images/aqua.png" },
  { id: 5, name: "SABUN MANDI", image: "/assets/images/aqua.png" },
  { id: 6, name: "SABUN DETERGEN", image: "/assets/images/aqua.png" },
  { id: 7, name: "SABUN CUCI PIRING", image: "/assets/images/aqua.png" },
  { id: 8, name: "GULA", image: "/assets/images/aqua.png" },
  { id: 9, name: "MINUMAN", image: "/assets/images/aqua.png" },
];

function Grup() {
  return (
    <div className="grup">
      <h1 className="kategori">KATEGORI</h1>
      <div className="grup-list">
        {groups.map((group, index) => (
          <Link key={group.id} to={`/grup/${group.name}`}>
            <div className="grup-card">
              <img src={group.image} alt={group.name} className="grup-image" />
              <h2>{group.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Grup;
