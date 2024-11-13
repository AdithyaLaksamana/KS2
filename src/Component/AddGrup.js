import React, {useState, useRef} from "react";
import axios from "axios";
import "../Styles/Add.css";
import {FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function AddGrup() {
    const [imageSrc, setImageSrc] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [groups, setGroups] = useState([]); 
    const [imageName, setImageName] = useState(''); // State untuk menyimpan nama gambar

    const fileInputRef = useRef(null); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    
    const handleSave = async () => {
        const newGroup = {
            name: groupName,
            image: imageSrc || '/assets/images/aqua.png',
        };

        console.log("gambar:" + imageName)
    
        try {
            const response = await axios.post('/api/category/create', newGroup);
            console.log('Kategori berhasil disimpan:', response.data);
    
            // Menambahkan kategori ke state local jika berhasil disimpan
            setGroups([...groups, response.data]);
    
            // Reset input field setelah menyimpan
            setGroupName('');
            setImageSrc(null);
        } catch (error) {
            console.error('Gagal menyimpan kategori:', error);
        }
    };
    
    return(
        <div className="Add">
            <div className="Container">
                <div className="content">
                    <div className="input-grup">
                        <label className="label">Nama Grup</label>
                        <input className="input-field" type="text" placeholder="Nama Grup" aria-label="Nama Grup" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
                    </div>
                    <div className="input-grup">
                        <label className="label">Gambar Grup</label>
                        <div className="addImage">
                            <img src={imageSrc || 'https://placehold.co/100x100'} alt="" className={`uploaded-image ${imageSrc ? "no-radius" : ""}`}/>
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef}/>
                            <FaPlusCircle className="openFile" onClick={openFileDialog} />
                        </div>
                    </div>
                    <button className="cancelButton">CANCEL</button>
                    <Link to=""><button className="saveButton" onClick={handleSave}>SAVE</button></Link>
                </div>
            </div>
        </div>
    )
}

export default AddGrup;