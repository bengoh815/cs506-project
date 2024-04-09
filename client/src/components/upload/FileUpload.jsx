/******************************************************************************
 * Filename: FileUpload.jsx
 * Purpose:  A component that allows the user to upload an audio file.
 * Author:   Victor Nguyen & Don Ma
 *
 * Description:
 * This file contains the FileUpload component that allows the user to upload an
 * audio file. The component displays a file input and a button that the user can
 * click to upload the selected file. The component also displays the name of the
 * selected file and the accepted file formats.
 *
 * Usage:
 * To use this component, simply import it into the desired file and render it.
 *
 * Notes:
 * [Any additional notes, considerations, or important information
 * about the file that may be relevant to developers or users.]
 *
 ******************************************************************************/

import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./FileUpload.css";

const FileUpload = () => {
  // File to be uploaded
  const [file, setFile] = useState(null);

  // Whether a file has been selected
  const [fileSelected, setFileSelected] = useState(false);

  // Name of the file to be uploaded
  const [fileStatus, setFileStatus] = useState("No file chosen");

  // Label for the file input
  const [chooseFileLabel, setChooseFileLabel] = useState("Choose a file");

  // Whether a file is being uploaded
  const [isUploading, setIsUploading] = useState(false);

  // Reference to the file input
  const fileInputRef = useRef();

  /**
   * Opens the file input dialog when the button is clicked.
   */
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

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
      setFileStatus("No file chosen");
      return;
    }

    setFileSelected(true);
    setChooseFileLabel("Change file");
    setFile(input);
    setFileStatus(input.name);
  };

  /**
   * Sends file to backend for conversion and updates the UI to reflect the upload progress.
   */
  const handleUpload = () => {
    setIsUploading(true);
    setFileStatus(`Uploading ${file.name}...`);

    // Create a new FormData object with the selecteed file
    const formData = new FormData();
    formData.append("audio-file", file);

    // Fetch request to backend
    fetch("http://127.0.0.1:5000/api/v1/recordings", {
      method: "POST",
      headers: {},
      body: formData,
    })
      .then((response) => {
        console.log("Posting file to backend...");
        console.log(response);

        // TODO: Change check to 200 when no data is returned from this call
        const expectedStatus = 200;

        if (response.status === expectedStatus) {
          setIsUploading(false);
          setFileSelected(false);
          setChooseFileLabel("Choose a file");
          setFile(null); // Reset file input
          setFileStatus(
            "Upload success! Please select another file to upload.",
          );
        } else {
          throw new Error(
            `Expected status ${expectedStatus} but received ${response.status}`,
          );
        }

        /**TODO: This is a temporary response to demonstrate response from backend.The actual implemenation will not return any data. Remove when implemented.
         */
        return response.blob();
      })
      .then((data) => {
        console.log("Temporary data response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsUploading(false);
        setFileSelected(false);
        setFile(null); // Reset file input
        setFileStatus("Upload failed. Please select a file and try again.");
      });
  };

  return (
    <div id="upload" data-testid="upload" style={{ padding: "1rem" }}>
      <h3 id="upload-heading" data-testid="upload-heading">
        Upload
      </h3>

      {!isUploading && (
        <>
          <div>
            {/* File Input - hidden */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".mp3, .m4a, .wav"
              hidden
            />

            {/* Choose File Button */}
            <Button
              id="choose-file-button"
              data-testid="choose-file-button"
              onClick={handleFileInputClick}
              variant="secondary"
            >
              {chooseFileLabel}
            </Button>

            {fileSelected && (
              /* Upload Button */
              <Button
                id="upload-file-button"
                data-testid="upload-file-button"
                onClick={handleUpload}
                variant="primary"
                disabled={!fileSelected}
              >
                Upload
              </Button>
            )}
          </div>
        </>
      )}

      <p id="file-name" data-testid="file-name">
        <em>{fileStatus}</em>
      </p>

      <p id="file-format-label" data-testid="file-format-label">
        Accepted file upload formats:
      </p>
      <ul
        id="accepted-file-formats-list"
        data-testid="accepted-file-formats-list"
      >
        <li>.mp3</li>
        <li>.m4a</li>
        <li>.wav</li>
      </ul>
    </div>
  );
};

export default FileUpload;
