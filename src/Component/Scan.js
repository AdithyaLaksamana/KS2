import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useNavigate } from 'react-router-dom';
import '../Styles/Scanner.css';

const Scanner = () => {
  const webcamRef = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const codeReader = useRef(new BrowserMultiFormatReader()).current;
  const isScanning = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const scanBarcode = async () => {
      if (webcamRef.current) {
        try {
          await codeReader.decodeFromVideoDevice(
            undefined,
            webcamRef.current.video,
            (result) => {
              if (result && isScanning.current) {
                setBarcode(result.text);
                isScanning.current = false;
                setIsLoading(true);
                
                setTimeout(() => {
                  setIsLoading(false);
                  let countdown = 3;
                  setTime(countdown);
                  const timer = setInterval(() => {
                    countdown -= 1;
                    setTime(countdown);
                    if (countdown <= 0) {
                      clearInterval(timer);
                      setBarcode(null);
                      setTime(0);
                      isScanning.current = true;
                    }
                  }, 1000);
                }, 1000);

                setTimeout(() => {
                  navigate('/add_produk', { state: { barcode: result.text } });
                }, 4000);
              }
            }
          );
        } catch (err) {
          console.error(err);
          setError(err);
        }
      }
    };

    if (!barcode) {
      scanBarcode();
    }

    const currentWebcam = webcamRef.current;

    return () => {
      codeReader.decodeFromVideoDevice(null, currentWebcam?.video, () => {});
    };
  }, [barcode, codeReader, navigate]);

  return (
    <div className="scanner-container">
      <div className="scanner-overlay">
        <div className="scanner-frame">
          <Webcam ref={webcamRef} className="webcam" />
          <div className="scanner-line"></div>
        </div>
      </div>
      {error ? (
        <p className="scan-text error">Terjadi kesalahan dengan kamera atau scanner.</p>
      ) : isLoading ? (
        <p className="scan-text">Loading...</p>
      ) : barcode ? (
        <>
          <p className="scan-text">Barcode: {barcode}</p>
          {time > 0 && <p className="scan-text">Loading... {time} detik...</p>}
        </>
      ) : (
        <p className="scan-text">Scanning...</p>
      )}
    </div>
  );
};

export default Scanner;
