import React, { useCallback, useRef, useState, useEffect } from "react";
import "../styles/Photobooth.css";
import frames from "../frames.json";
import Webcam from "react-webcam";
import { IoCameraOutline } from "react-icons/io5";
import axios from "axios";
import { IoMdCheckmark } from "react-icons/io";

function Photobooth() {
    const [frameSelected, setFrameSelected] = useState(false);
    const [photoBoothStart, setPhotoBoothStart] = useState(false);
    const [timer, setTimer] = useState(1);
    const [photoCount, setPhotoCount] = useState(0);
    const maxPhotos = 8;
    const webcamRef = useRef(null);
    const [photos, setPhotos] = useState([]);
    const [photoStrip, setPhotoStrip] = useState(null);
    const [frame, setFrame] = useState("");
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const capture = useCallback(() => {
        if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
        }
    }, [webcamRef]);

    const frameSelection = (frame) => {
        let selectedFrame = frame.replace("/", "").replace(".png", "");
        setFrameSelected(true);
        setFrame(selectedFrame);
    };

    const startPhotoBooth = () => {
        if (photoCount < maxPhotos) {
        setPhotoBoothStart(true);
        setTimer(1);
        }
    };

    useEffect(() => {
        if (!photoBoothStart) return;

        if (timer > 0) {
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
        }
    }, [photoBoothStart, timer]);

    useEffect(() => {
        if (timer === 0 && photoCount < maxPhotos) {
        capture();
        setPhotoCount((prev) => prev + 1);
        setPhotoBoothStart(false);
        setTimer(1);
        }
    }, [timer, photoCount, capture]);

    async function uploadPhotos(frame, selectedPhotos) {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 1200;
        const ctx = canvas.getContext("2d");
      
        const loadImage = (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => resolve(img);
          });
      
        const imgs = await Promise.all(selectedPhotos.map(loadImage));
      
        const cellWidth = 350;
        const cellHeight = 225;
      
        imgs.forEach((img, i) => {
          const y = i * 250;
      
          const offsetXLeft = (cellWidth - cellWidth) / 2;
          const offsetYLeft = (cellHeight - cellHeight) / 2;
          ctx.drawImage(img, offsetXLeft + 25, y + offsetYLeft, 348, 258);

          const offsetXRight = cellWidth + (cellWidth - cellWidth) / 2;
          const offsetYRight = (cellHeight - cellHeight) / 2;
          ctx.drawImage(img, offsetXRight + 75, y + offsetYRight, 348, 258);
        });
      
        const frameImg = await loadImage(`/Classic Pink Photostrip.png`);
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      
        const finalStrip = canvas.toDataURL("image/png");
        setPhotoStrip(finalStrip);
    }

  return (
    <div className="photoboothContainer">
      {photoStrip && 
        <div className="photoStrip">
          <h3>thanks for using fotolab!</h3>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = photoStrip; 
              link.download = "photostrip.png"; 
              link.click(); 
            }}
          >
            Download
          </button>
          <img src={photoStrip} alt="Photo strip result" />
        </div>
      }
      {!frameSelected && <h3>select a frame!</h3>}
      {(!frameSelected && !photoStrip) ? (
        <>
        <div className="frameSelection">
          {frames.classics.map((frame, index) => (
            <div key={index} className="frame">
              <img src={frame} alt={`frame ${index}`} />
              <button onClick={() => frameSelection(frame)}>select</button>
            </div>
          ))}
        </div>
        </>
      ) : (photoCount == 4 && !photoStrip) ? (
        <>
          <p style={{ letterSpacing: "0.2em", fontSize: "1.5rem", marginTop: "4em"}}>
            select 4 photos for the photo strip!
          </p>
          <p style={{marginBottom: "2em", letterSpacing: "0.2em", fontSize: "1rem"}}>(scroll down to see all photos!)</p>
          <div className="capturedPhotos">
            {photos.map((photo, index) => {
              const isSelected = selectedPhotos.includes(photo);
              return (
                <button
                  key={index}
                  className="photoWrapper"
                  onClick={() => {
                    if (isSelected) {
                      setSelectedPhotos(
                        selectedPhotos.filter((p) => p !== photo)
                      );
                    } else if (selectedPhotos.length < 4) {
                      setSelectedPhotos([...selectedPhotos, photo]);
                    }
                  }}
                  style={{ position: "relative", cursor: "pointer", display: "inline-block", margin: "0.5rem"}}
                >
                  <img src={photo} alt={`Captured ${index}`} />

                  {isSelected && (
                    <>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.3)" }}></div>
                      <IoMdCheckmark style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "2rem"}} />
                    </>
                  )}
                </button>
              );
            })}
          </div>
          <button className="confirmBtn" disabled={selectedPhotos.length !== 4} onClick={() => uploadPhotos(frame, photos)}>confirm</button>
        </>
      ) : (
        !photoStrip ? (
        <>
          <p className="prompt" style={{marginTop: "5em"}}>
            {!photoBoothStart ? "click the camera icon!" : "smile!"}
          </p>
          {photoBoothStart && (
            <p className="timer">{photoBoothStart ? timer + "s" : "8s"}</p>
          )}
          <div className="webcamContainer">
            <Webcam
              ref={webcamRef}
              style={{
                width: "100%",
                marginBottom: "-0.4rem",
              }}
            />
            <div className="cameraBtnContainer">
              <button onClick={startPhotoBooth} className="cameraBtn">
                <IoCameraOutline />
              </button>
            </div>
          </div>
          {photoCount > 0 && (
            <p className="photoCount">
              photo: {photoCount}/{maxPhotos}
            </p>
          )}
        </>
        ) : (
          <></>
        )
      )}
    </div>
  );
}

export default Photobooth;
