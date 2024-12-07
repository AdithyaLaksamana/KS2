import React, { useState, useEffect } from "react";
import "../Styles/Laporan.css";
import "../Styles/Laporan_Keuangan.css";


function Laporan_Keuangan() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Bulan saat ini (1-12)
    const currentWeek = Math.ceil(new Date().getDate() / 7); // Minggu saat ini

    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Tahun default: tahun sekarang
    const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString()); // Bulan default: bulan sekarang
    const [viewType, setViewType] = useState("week"); // Tampilan default: per minggu
    const [selectedWeek, setSelectedWeek] = useState(currentWeek.toString()); // Minggu default: minggu saat ini
    const [selectedDay, setSelectedDay] = useState(""); // Pilihan hari
    const [selectedType, setSelectedType] = useState("all"); 
    // const [totalHarga, setTotalHarga] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/api/transaction")
            .then((response) => response.json())
            .then((transactions) => {
                const transactionData = [];

                transactions.forEach((transaction) => {
                    const transactionType = transaction.transactionType;
                    const description = transaction.description  ;
                    console.log("Transactions: ", description)
                    transaction.items.forEach((itemData) => {
                        const item = itemData.item;
                        const amount = itemData.amount;
                        const price = item.sellPrice;
                        
                        transactionData.push({
                            date: new Date(transaction.transactionDate),
                            name: item.name,
                            description: item.description,
                            amount: amount,
                            price: price,
                            type: transactionType,
                            transaction_desc : description,
                        });
                    });
                });

                setData(transactionData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const getYearsRange = () => {
        const years = data.map((item) => item.date.getFullYear());
        const earliestYear = Math.min(...years);
        const currentYear = new Date().getFullYear();
        const range = [];

        for (let year = earliestYear; year <= currentYear; year++) {
            range.push(year);
        }

        return range;
    };

    const getTransactionTypes = () => {
        const types = [...new Set(data.map((item) => item.type))];
        return types;
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const filterData = () => {
        let filtered = data;

        if (selectedYear && selectedYear !== "all") {
            filtered = filtered.filter((item) => item.date.getFullYear().toString() === selectedYear);
        }

        if (selectedMonth && selectedMonth !== "all") {
            const monthIndex = parseInt(selectedMonth) - 1;
            filtered = filtered.filter((item) => item.date.getMonth() === monthIndex);

            if (viewType === "week" && selectedWeek) {
                const weekStart = (selectedWeek - 1) * 7 + 1;
                const weekEnd = Math.min(weekStart + 6, getDaysInMonth(selectedYear, monthIndex));
                filtered = filtered.filter(
                    (item) => item.date.getDate() >= weekStart && item.date.getDate() <= weekEnd
                );
            }

            if (viewType === "day" && selectedDay) {
                filtered = filtered.filter((item) => item.date.getDate() === parseInt(selectedDay));
            }
        }

        if (selectedType && selectedType !== "all") {
            filtered = filtered.filter((item) => item.type === selectedType);
            console.log("Kategori yang dipilih: ", selectedType);

        }

        return filtered;
    };

    const filteredData = filterData();
    const totalFilteredHarga = filteredData.reduce(
        (total, item) => total + item.price * item.amount,
        0
    );

    const resetToDefault = () => {
        setSelectedYear(currentYear.toString());
        setSelectedMonth(currentMonth.toString());
        setViewType("week");
        setSelectedWeek(currentWeek.toString());
        setSelectedDay("");
    };

    return (
        <div className="Laporan">
            <div className="FilterControls">
                <div className="filter-item">
                    <label htmlFor="yearFilter">Tahun:</label>
                    <select
                        id="yearFilter"
                        value={selectedYear}
                        onChange={(e) => {
                            setSelectedYear(e.target.value);
                            setSelectedMonth(""); // Reset pilihan bulan
                            setViewType(""); // Reset pilihan view
                            setSelectedWeek(""); // Reset pilihan minggu
                            setSelectedDay(""); // Reset pilihan hari
                        }}
                    >
                        <option value="all">Tampilkan Semua</option>
                        {getYearsRange().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedYear && selectedYear !== "all" && (
                    <div className="filter-item">
                        <label htmlFor="monthFilter">Bulan:</label>
                        <select
                            id="monthFilter"
                            value={selectedMonth}
                            onChange={(e) => {
                                setSelectedMonth(e.target.value);
                                setViewType("");
                                setSelectedWeek("");
                                setSelectedDay("");
                            }}
                        >
                            <option value="all">Tampilkan Semua</option>
                            {[
                                "Januari",
                                "Februari",
                                "Maret",
                                "April",
                                "Mei",
                                "Juni",
                                "Juli",
                                "Agustus",
                                "September",
                                "Oktober",
                                "November",
                                "Desember",
                            ].map((month, index) => (
                                <option key={index} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedMonth && selectedMonth !== "all" && (
                    <div className="filter-item">
                        <label htmlFor="viewType">Tampilan:</label>
                        <select
                            id="viewType"
                            value={viewType}
                            onChange={(e) => {
                                setViewType(e.target.value);
                                setSelectedWeek(""); // Reset pilihan minggu
                                setSelectedDay(""); // Reset pilihan hari
                            }}
                        >
                            <option value="all">Tampilkan Semua</option>
                            <option value="week">Per Minggu</option>
                            <option value="day">Per Hari</option>
                        </select>
                    </div>
                )}

                {viewType === "week" && (
                    <div className="filter-item">
                        <label htmlFor="weekFilter">Minggu ke:</label>
                        <select
                            id="weekFilter"
                            value={selectedWeek}
                            onChange={(e) => setSelectedWeek(e.target.value)}
                        >
                            <option value="all">Tampilkan Semua</option>
                            {[...Array(Math.ceil(getDaysInMonth(selectedYear, selectedMonth - 1) / 7))].map(
                                (_, index) => (
                                    <option key={index} value={index + 1}>
                                        Minggu {index + 1}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                )}

                {viewType === "day" && (
                    <div className="filter-item">
                        <label htmlFor="dayFilter">Tanggal:</label>
                        <select
                            id="dayFilter"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                        >
                            <option value="all">Tampilkan Semua</option>
                            {[...Array(getDaysInMonth(selectedYear, selectedMonth - 1))].map((_, index) => {
                                const day = index + 1;
                                const date = new Date(selectedYear, selectedMonth - 1, day);
                                const dayName = date.toLocaleString('id-ID', { weekday: 'long' });
                                return (
                                    <option key={index} value={day}>
                                        {dayName.charAt(0).toUpperCase() + dayName.slice(1)} - {day}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}
                
                <div className="filter-item">
                    <label htmlFor="typeFilter">Tipe Transaksi:</label>
                    <select
                        id="typeFilter"
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            console.log("Kategori yang dipilih: ", e.target.value);
                          }}
                    >
                        <option value="all">Tampilkan Semua</option>
                        {getTransactionTypes().map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={resetToDefault}>Reset ke Default</button>
            </div>

            {filteredData.length > 0 && (
                    <div className="Keuangan">
                        <div className="LaporanHeader">
                            <p>Tipe Transaksi</p>
                            <p className="desc">Deskripsi</p>
                            <p>Tanggal</p>
                            <p>Produk</p>
                            <p>Jumlah</p>
                            <p>Harga</p>
                            <p>Total</p>
                        </div>
                        {filteredData.map((item, index) => (
                            <div className="LaporanItem" key={index}>
                                <p>{item.type}</p>
                                <p>{item.transaction_desc}</p>
                                <p>{item.date ? item.date.toLocaleString("id-ID") : ""}</p>
                                <p>
                                    <strong>{item.name}</strong>
                                    <br />
                                    {item.description}
                                </p>
                                <p>{item.amount}</p>
                                <p>Rp {item.price ? item.price.toLocaleString("id-ID") : ""},00</p>
                                <p>Rp {(item.amount * item.price).toLocaleString("id-ID")},00</p>
                            </div>
                        ))}
                        <div className="LaporanFooter">
                            <p>TOTAL :</p>
                            <p>Rp {totalFilteredHarga.toLocaleString("id-ID")},00</p>
                        </div>
                    </div>
            )}
        </div>
    );
}

export default Laporan_Keuangan;
