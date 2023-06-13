import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

function Dashboard() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    const filesWithThumbnails = fileList.map((file) => ({
      file,
      thumbnail: URL.createObjectURL(file)
    }));
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...filesWithThumbnails
    ]);
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="file-list">
        {selectedFiles.map((file, index) => (
          <div key={index} className="file-item">
            <FaPlay />
            <p>{file.file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
