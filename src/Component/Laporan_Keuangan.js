import React, { useState, useEffect } from "react";
import "../Styles/Laporan.css";

function Laporan_Keuangan() {
    const [data, setData] = useState([]); // State untuk menyimpan data transaksi
    const [totalHarga, setTotalHarga] = useState(0); // State untuk total harga

    useEffect(() => {
        // Fetch data dari API
        fetch("http://localhost:8080/api/transaction") // Ganti URL dengan endpoint API yang benar
            .then((response) => response.json())
            .then((transactions) => {
                const transactionData = [];

                // Loop untuk memproses data transaksi dan itemnya
                transactions.forEach((transaction) => {
                    transaction.items.forEach((itemData) => {
                        const item = itemData.item; // Ambil item dari transaction
                        const amount = itemData.amount;
                        const price = item.sellPrice; // Atau gunakan purchasePrice jika perlu
                        
                        // Push data transaksi yang diproses ke dalam array
                        transactionData.push({
                            date: new Date(transaction.transactionDate).toLocaleString('id-ID'),
                            name: item.name,
                            description: item.description,
                            amount: amount,
                            price: price,
                        });
                    });
                });

                setData(transactionData); // Menyimpan data transaksi yang telah diproses

                // Hitung total harga
                const total = transactionData.reduce((total, item) => total + (item.price * item.amount), 0);
                setTotalHarga(total);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

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
                {data.map((item, index) => (
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
}

export default Laporan_Keuangan;
