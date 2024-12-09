import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../Styles/Add.css";
import { FaPlusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function AddGrup() {
  const [imageSrc, setImageSrc] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [setImageName] = useState("");
  const fileInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.state?.categoryId;

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/${categoryId}`);
          const group = response.data;
          setGroupName(group.name);
          setImageSrc(group.image || null);
        } catch (error) {
          console.error("Gagal mengambil data kategori:", error);
          alert("Terjadi kesalahan saat memuat data kategori.");
        }
      };
      fetchCategory();
    }
  }, [categoryId]);

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
    if (!groupName) {
      alert("Harap lengkapi semua kolom!");
      return;
    }

    const newGroup = {
      name: groupName,
      image: imageSrc || "/assets/images/aqua.png",
    };

    try {
      let response;
      if (categoryId) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/category/${categoryId}/update`, newGroup);
        alert("Kategori berhasil diperbarui!");
        navigate(-1);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/category/create`, newGroup);
        alert("Kategori berhasil dibuat!");
        navigate(-1);
      }
      setGroups([...groups, response.data]);
      setGroupName("");
      setImageSrc(null);
      navigate("/grup");
    } catch (error) {
      console.error("Gagal menyimpan kategori:", error);
      alert("Terjadi kesalahan saat menyimpan kategori.");
    }
  };

  return (
    <div className="Add">
      <div className="Container">
        <div className="content">
          <div className="input-grup">
            <label className="label">Nama Grup</label>
            <input
              className="input-field"
              type="text"
              placeholder="Nama Grup"
              aria-label="Nama Grup"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="input-grup">
            <label className="label">Gambar Grup</label>
            <div className="addImage">
              <img
                src={imageSrc || "https://placehold.co/100x100"}
                alt="Preview"
                className={`uploaded-image ${imageSrc ? "no-radius" : ""}`}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <FaPlusCircle className="openFile" onClick={openFileDialog} />
            </div>
          </div>
          <button className="cancelButton" onClick={() => window.history.back()}>
            CANCEL
          </button>
          <button className="saveButton" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGrup;