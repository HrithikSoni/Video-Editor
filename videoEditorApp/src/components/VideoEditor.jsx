import React, { useState } from "react";
import Dropzone from "react-dropzone";
import ReactPlayer from "react-player";
import { FaPlay, FaPause, FaForward } from "react-icons/fa";
import "./videoeditor.css";

function VideoEditor() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [videoSize, setVideoSize] = useState(100);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoRotation, setVideoRotation] = useState("0deg");
  const [videoPosition, setVideoPosition] = useState({ x: 0, y: 0, z: 0 });
  const [videoOpacity, setVideoOpacity] = useState(100);

  const handleAssetDrop = (acceptedFiles) => {
    const newAssets = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setAssets((prevAssets) => [...prevAssets, ...newAssets]);
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleVideoSizeChange = (event) => {
    setVideoSize(parseInt(event.target.value));
  };

  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setVideoPlaying(false);
  };

  const handleVideoForward = () => {};

  const handleScaleChange = (event) => {};

  const handleOpacityChange = (event) => {
    setVideoOpacity(parseInt(event.target.value));
  };

  const handleRotationChange = (event) => {
    setVideoRotation(event.target.value);
  };

  const handlePositionChange = (axis, event) => {
    setVideoPosition((prevPosition) => ({
      ...prevPosition,
      [axis]: parseInt(event.target.value)
    }));
  };

  return (
    <div className="container">
      <div className="column">
        <h2>Assets</h2>
        <Dropzone onDrop={handleAssetDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag and drop audio/video files here</p>
            </div>
          )}
        </Dropzone>
        <div className="asset-list">
          {assets.map((asset, index) => (
            <div
              key={index}
              className={`asset ${selectedAsset === asset ? "selected" : ""}`}
              onClick={() => handleAssetClick(asset)}
            >
              <FaPlay />
              <h3>Selected Video</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <h2>Preview</h2>
        <div className="video-preview">
          {selectedAsset && (
            <ReactPlayer
              url={selectedAsset.preview}
              playing={videoPlaying}
              width={`${videoSize}%`}
              height="auto"
              style={{
                transform: `rotate(${videoRotation})`,
                opacity: videoOpacity / 100,
                position: "absolute",
                left: `${videoPosition.x}px`,
                top: `${videoPosition.y}px`,
                zIndex: videoPosition.z
              }}
            />
          )}
        </div>
        <div className="video-controls">
          <button onClick={handleVideoPlay}>
            <FaPlay />
          </button>
          <button onClick={handleVideoPause}>
            <FaPause />
          </button>
          <button onClick={handleVideoForward}>
            <FaForward />
          </button>
        </div>
      </div>
      <div className="column">
        <h2>Properties</h2>
        <div className="property">
          <label htmlFor="scale">Scale:</label>
          <input
            type="range"
            id="scale"
            min="10"
            max="200"
            value={videoSize}
            onChange={handleVideoSizeChange}
          />
          <span>{`${videoSize}%`}</span>
        </div>
        <div className="property">
          <label htmlFor="opacity">Opacity:</label>
          <input
            type="range"
            id="opacity"
            min="0"
            max="100"
            value={videoOpacity}
            onChange={handleOpacityChange}
          />
          <span>{`${videoOpacity}%`}</span>
        </div>
        <div className="property">
          <label htmlFor="rotation">Rotation:</label>
          <select
            id="rotation"
            value={videoRotation}
            onChange={handleRotationChange}
          >
            <option value="0deg">0deg</option>
            <option value="45deg">45deg</option>
            <option value="90deg">90deg</option>
            {/* Add more rotation options as needed */}
          </select>
        </div>
        <div className="property">
          <label htmlFor="position-x">Position X:</label>
          <input
            type="range"
            id="position-x"
            min="0"
            max="1000"
            value={videoPosition.x}
            onChange={(e) => handlePositionChange("x", e)}
          />
          <span>{`${videoPosition.x}px`}</span>
        </div>
        <div className="property">
          <label htmlFor="position-y">Position Y:</label>
          <input
            type="range"
            id="position-y"
            min="0"
            max="1000"
            value={videoPosition.y}
            onChange={(e) => handlePositionChange("y", e)}
          />
          <span>{`${videoPosition.y}px`}</span>
        </div>
        <div className="property">
          <label htmlFor="position-z">Position Z:</label>
          <input
            type="range"
            id="position-z"
            min="-10"
            max="10"
            value={videoPosition.z}
            onChange={(e) => handlePositionChange("z", e)}
          />
          <span>{`${videoPosition.z}`}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoEditor;
