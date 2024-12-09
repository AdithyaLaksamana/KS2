import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../Styles/Add.css";
import { FaQrcode, FaPlusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Scan from './Scan';

function AddProduk() {
    const [barcode, setBarcode] = useState('');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchase, setPurchase] = useState('');
    const [sell, setSell] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);
    const location = useLocation();
    const itemId = location.state?.itemId;
    const barcodeFromScan = location.state?.barcode;
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
                setCategories(response.data);
            } catch (error) {
                console.error('Gagal mengambil kategori', error);
            }
        };
        fetchCategories();

        if (itemId) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/item/${itemId}`);
                    const product = response.data;
                    setBarcode(product.barcode);
                    setProductName(product.name);
                    setCategory(product.category);
                    setDesc(product.description);
                    setQuantity(product.amount);
                    setPurchase(product.purchasePrice);
                    setSell(product.sellPrice);
                    setImageBase64(product.imageBase64);
                } catch (error) {
                    console.error('Gagal mengambil data produk:', error);
                }
            };
            fetchProduct();
        }

        if (barcodeFromScan) {
            setBarcode(barcodeFromScan);
            const autoCloseTimer = setTimeout(() => {
                handleClose(); // Menutup modal secara otomatis
            }, 3000); // 3 detik setelah barcode dipindai
        
            return () => clearTimeout(autoCloseTimer); 
        }
    }, [itemId, barcodeFromScan]);
      
    const handleClose = () => {
        setShowScanner(false);
        console.log("Modal ditutup", barcode);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleSave = async () => {
        if (!barcode || !productName || !category || !quantity || !purchase || !sell) {
            alert("Harap lengkapi semua kolom!");
            return;
        }

        const newProduct = {
            barcode: parseInt(barcode),
            name: productName,
            category: category,
            description: desc,
            amount: parseInt(quantity),
            purchasePrice: parseInt(purchase),
            sellPrice: parseInt(sell),
            imageBase64: imageBase64 || null,
        };

        try {
            let response;
            if (itemId) {
                response = await axios.put(`${process.env.REACT_APP_API_URL}/item/${itemId}/update`, newProduct);
                console.log("Produk berhasil diperbarui:", response.data); // Tambahkan respons untuk debugging
                alert("Produk berhasil diperbarui!");
                navigate(-1);
            } else {
                response = await axios.post(`${process.env.REACT_APP_API_URL}/item/create`, newProduct);
                console.log("Produk berhasil dibuat:", response.data); // Tambahkan respons untuk debugging
                alert("Produk berhasil dibuat!");
                navigate(-1);
            }            
            setBarcode('');
            setProductName('');
            setCategory('');
            setDesc('');
            setQuantity('');
            setPurchase('');
            setSell('');
            setImageBase64('');
        } catch (error) {
            console.error('Gagal menyimpan produk:', error);
            alert(`Terjadi kesalahan: ${error.message}`);
        }
    };

    return (
        <div className="Add">
            <div className="Container">
                <div className="content">
                    <div className="input-produk">
                        <label className="label">QR Code/Barcode</label>
                        <div className="Barcode">
                            <input
                                className="input-field"
                                type="text"
                                placeholder="QR Code/Barcode"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                            />
                            <FaQrcode onClick={() => setShowScanner(true)} />
                        </div>
                    </div>
                    <div className="input-produk">
                        <label className="label">Nama Produk</label>
                        <input className="input-field" type="text" placeholder="Nama Produk" aria-label="Nama Produk" value={productName} onChange={(e) => setProductName(e.target.value)}/>
                    </div>
                    <div className="input-produk">
                        <label className="label">Kategori</label>
                        <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Pilih Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>  // Sesuaikan dengan data kategori
                            ))}
                        </select>
                    </div>
                    
                    <div className="input-produk">
                        <label className="label">Deskripsi</label> 
                        <input className="input-field" placeholder="Deskripsi Produk" aria-label="Deskripsi Produk" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className="input-produk">
                        <label className="label">Jumlah</label>
                        <input className="input-field" type="number" placeholder="Kuantitas" aria-label="Kuantitas" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className="input-produk">
                        <label className="label">Harga Beli</label>
                        <input className="input-field" type="number" placeholder="Harga Beli" aria-label="Harga Beli" value={purchase} onChange={(e) => setPurchase(e.target.value)}/>
                    </div>
                    <div className="input-produk">
                        <label className="label">Harga Jual</label>
                        <input className="input-field" type="number" placeholder="Harga Jual" aria-label="Harga Jual" value={sell} onChange={(e) => setSell(e.target.value)}/>
                    </div>
                    <div className="input-produk">
                        <label className="label">Gambar Produk</label>
                        <div className="addImage">
                            <img
                                src={imageBase64 ? `data:image/png;base64,${imageBase64}` : 'https://placehold.co/100x100'}
                                alt="Preview"
                                className="uploaded-image"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                            />
                            <FaPlusCircle className="openFile" onClick={openFileDialog} />
                        </div>
                    </div>
                    <button className="cancelButton" onClick={() => window.history.back()}>
                        CANCEL
                    </button>
                    <button className="saveButton" onClick={handleSave}>SAVE</button>
                </div>
            </div>
            {showScanner && (
                <div className="modal-overlay" onClick={() => setShowScanner(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setShowScanner(false)}>
                            X
                        </button>
                        <Scan />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddProduk;
