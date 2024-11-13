import React from "react";
import "../Styles/Laporan.css";

const Data = [
    { date: "14 Mei 2021 08:35", name: "AQUA", description: "Air Mineral, Botol 600 ml", amount: 3, price: 300000 },
    { date: "13 Mei 2021 08:35", name: "AQUA", description: "Air Mineral, Botol 600 ml", amount: 4, price: 200000 },
    { date: "12 Mei 2021 08:35", name: "AQUA", description: "Air Mineral, Botol 600 ml", amount: 5, price: 100000 },
];

const totalHarga = Data.reduce((total, item) => total + (item.price * item.amount), 0);
function Laporan_Keuangan() {
    return (
        <div className="Laporan">
            <div className="Keuangan">
                <div className="LaporanHeader">
                    <p>Tanggal</p>
                    <p>Produk</p>
                    <p>Jumlah</p>
                    <p>Harga</p> 
                    <p>Total</p> 
                </div>
                {Data.map((item, index) => (
                    <div className="LaporanItem" key={index}>
                        <p>{item.date}</p>
                        <p><strong>{item.name}</strong><br />{item.description}</p>
                        <p>{item.amount}</p>
                        <p>Rp {item.price.toLocaleString("id-ID")},00</p>
                        <p>Rp {(item.price * item.amount).toLocaleString("id-ID")},00</p>
                    </div>
                ))}
                <div className="LaporanFooter">
                    <p>TOTAL :</p>
                    <p>Rp {totalHarga.toLocaleString("id-ID")},00</p>
                </div>
            </div>
        </div>
    );  
};
export default Laporan_Keuangan