import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/browser';
import './Scanner.css';

const Scanner = () => {
  const webcamRef = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const codeReader = useRef(new BrowserMultiFormatReader()).current;

  useEffect(() => {
    const scanBarcode = async () => {
      if (webcamRef.current) {
        try {
          await codeReader.decodeFromVideoDevice(
            undefined,
            webcamRef.current.video,
            (result, error) => {
              if (result) {
                setBarcode(result.text);
              }
            }
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    scanBarcode();

    const currentWebcam = webcamRef.current;

    return () => {
      codeReader.decodeFromVideoDevice(null, currentWebcam?.video, () => {});
    };
  }, [codeReader]);

  return (
    <div className="scanner-container">
      <div className="scanner-overlay">
        <div className="scanner-frame">
          <Webcam ref={webcamRef} className="webcam" />
          <div className="scanner-line"></div>
        </div>
      </div>
      {barcode ? <p className="scan-text">Barcode: {barcode}</p> : <p className="scan-text">Scanning...</p>}
      <button className="cancel-button">Cancel</button>
    </div>
  );
};

export default Scanner;

// import React, { useState } from 'react';

// const BarcodeInput = () => {
//   const [barcode, setBarcode] = useState('');

//   const handleInput = (e) => {
//     setBarcode(e.target.value);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={barcode}
//         onChange={handleInput}
//         placeholder="Scan barcode here..."
//       />
//       {barcode && <p>Barcode: {barcode}</p>}
//     </div>
//   );
// };

// export default BarcodeInput;