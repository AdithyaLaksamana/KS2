import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Grup.css";

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

function Grup2() {
  return (
    <div className="grup">
        <div className="grupHeader">
            <Link to="/grup" ><button className="grupButton">grup2</button></Link>
            <h1 className="kategori">KATEGORI</h1>
        </div>
        <div className="grup-list-2">
            {groups.map((group, index) => (
                <Link key={group.id} to={`/grup/${group.name}`}>
                    <div className="grup-card-2">
                        <h2>{group.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
}

export default Grup2;
