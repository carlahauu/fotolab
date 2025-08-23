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
    const [timer, setTimer] = useState(8);
    const [photoCount, setPhotoCount] = useState(0);
    const maxPhotos = 8;
    const webcamRef = useRef(null);
    const [photos, setPhotos] = useState([]);
    const [photoStrip, setPhotoStrip] = useState(null);
    const [frame, setFrame] = useState("");
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const capture = useCallback(() => {
      if (!webcamRef.current) return;
    
      const src = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 350;  
        canvas.height = 225; 
        const ctx = canvas.getContext("2d");
    
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (img.width - canvas.width / scale) / 2;
        const y = (img.height - canvas.height / scale) / 2;
    
        ctx.drawImage(img, x, y, canvas.width / scale, canvas.height / scale, 0, 0, canvas.width, canvas.height);
    
        const cropped = canvas.toDataURL("image/png");
        setPhotos((prev) => [...prev, cropped]);
      };
    }, [webcamRef]);    

    const frameSelection = (frame) => {
        let selectedFrame = frame.replace(".png", "");
        selectedFrame = selectedFrame + "-2" + ".png"; 
        setFrameSelected(true);
        setFrame(selectedFrame);
    };

    const startPhotoBooth = () => {
        if (photoCount < maxPhotos) {
        setPhotoBoothStart(true);
        setTimer(5);
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
        setTimer(5);
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
          var y = 0; 
          if (i == 3){
            y = (i * 250);
          }
          else if (i == 2){
            y = (i * 250) + 5; 
          }
          else if (i == 1){
            y = (i * 250) + 11;
          }
          else {
            y = (i * 250) + 20; 
          }
      
          ctx.drawImage(img, 25, y, 348, 225);

          const offsetXRight = cellWidth + (cellWidth - cellWidth) / 2;
          const offsetYRight = (cellHeight - cellHeight) / 2;
          ctx.drawImage(img, offsetXRight + 75, y + offsetYRight, 348, 225);
        });
      
        const frameImg = await loadImage(frame);
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
      ) : (photoCount == 8 && !photoStrip) ? (
        <>
          <p style={{ letterSpacing: "0.2em", fontSize: "1.5rem", marginTop: "4em", width: "80%"}}>
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
              screenshotFormat="image/png"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
              }}
              mirrored={true}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover" 
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
