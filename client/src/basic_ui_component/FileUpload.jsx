import React, { useState } from "react";
import "./FileUpload.css";
import { useEffect } from "react";

const FileUpload = () => {
  // File to be uploaded
  const [file, setFile] = useState(null);

  // Whether a file has been selected
  const [fileSelected, setFileSelected] = useState(false);

  // Name of the file to be uploaded
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");

  // Label for the file input
  const [chooseFileLabel, setChooseFileLabel] = useState("Choose a file");

  // Whether a file is being uploaded
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Update the file name when a new file is selected and enables the upload button.
   *
   * @param {*} event - Event object
   */
  const handleFileChange = (event) => {
    let input = event.target.files[0];

    if (input === undefined) {
      setFileSelected(false);
      setChooseFileLabel("Choose a file");
      setSelectedFileName("No file chosen");
      return;
    }

    setFileSelected(true);
    setChooseFileLabel("Change file");
    setFile(input);
    setSelectedFileName(input.name);
  };

  /**
   * Sends file to backend for conversion and updates the UI to reflect the upload progress.
   */
  const handleUpload = () => {
    console.log(file);
    setIsUploading(true);
    setSelectedFileName(`Uploading ${file.name}...`);

    const formData = new FormData();
    formData.append("audio-file", file);

    // TODO: fetch request to backend
    fetch("http://127.0.0.1:5000/api/v1/recordings", {
      method: "POST",
      headers: {
        // TODO: Add headers
      },
      body: formData,
    }).then((response) => {
      console.log("Posting file to backend...");
      console.log(response);

      // Reset the UI after 2 seconds
      setTimeout(() => {
        setIsUploading(false);
        setFileSelected(false);
        setChooseFileLabel("Choose a file");
        setSelectedFileName("No file chosen");
      }, 2000);
    });
  };

  return (
    <div id="upload">
      <h2 id="upload-heading">Upload</h2>

      <p id="file-name">
        <em>{selectedFileName}</em>
      </p>

      {isUploading ? (
        <></>
      ) : (
        <>
          <div>
            <label htmlFor="file-input" id="file-input-label">
              {chooseFileLabel}
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              accept=".mp3, .m4a, .wav"
              hidden
            />
            <input
              type="button"
              id="upload-file-button"
              onClick={handleUpload}
              value="Upload"
              disabled={!fileSelected}
            />
          </div>
        </>
      )}

      <p id="file-format-label">Accepted file upload formats:</p>
      <ul>
        <li>.mp3</li>
        <li>.m4a</li>
        <li>.wav</li>
      </ul>
    </div>
  );
};

export default FileUpload;
