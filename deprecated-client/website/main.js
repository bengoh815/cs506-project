/******************************************************************************
 * Filename: main.js
 * Purpose:  Main entry point for the frontend application.
 * Author:   Victor Nguyen
 *
 * Description:
 * TODO: Add description
 *
 * Usage (Optional):
 * [Instructions or examples demonstrating how to use the code in this file.
 * Include any dependencies or prerequisites required for proper usage.]
 *
 * Notes:
 * [Any additional notes, considerations, or important information
 * about the file that may be relevant to developers or users.]
 *
 ******************************************************************************/

// Fetch converted files from the backend and display them
let convertedFiles = [];

// TODO: use correct url, and relevant headers and body
fetch("https://example.com/api/converted-files", {
  headers: {},
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Display the files
    convertedFiles = data;
    const conversionHistoryTable = document.getElementById(
      "conversion-history-table",
    );

    // Show first 10 files
    for (let i = 0; i < 10; i++) {
      const file = convertedFiles[i];
      const fileRow = document.createElement("tr");
      const name = document.createElement("td");
      const author = document.createElement("td");
      const date = document.createElement("td");

      name.innerHTML = `<a href="${file.url}" target="_blank">fileName${i}</a>`;
      author.innerHTML = `author${i}`;
      date.innerHTML = `date${i}`;

      fileRow.appendChild(name);
      fileRow.appendChild(author);
      fileRow.appendChild(date);

      conversionHistoryTable.appendChild(fileRow);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

let fileToUpload = null; // The file to upload to the backend

const recordInput = document.getElementById("record-file-input");

recordInput.addEventListener("click", () => {
  // TODO: Implement recording functionality
  console.log("Recording...");
});

const uploadFileName = document.getElementById("upload-file-name");
const uploadInput = document.getElementById("upload-file-input");
const uploadFileLabel = document.getElementById("upload-file-label");
const uploadFileButton = document.getElementById("upload-file-button");

// When a file is selected, update the fileToUpload variable
uploadInput.addEventListener("change", () => {
  fileToUpload = uploadInput.files[0];

  uploadFileLabel.innerHTML = "Choose a different file";
  uploadFileName.innerHTML = `<em>${fileToUpload.name}</em>`;
  uploadFileButton.disabled = false;
});

// When the upload button is clicked, upload the file to the backend
uploadFileButton.addEventListener("click", () => {
  console.log("Uploading file...");
  console.log(fileToUpload);

  // TODO: fetch request to backend
  fetch("some-url", {
    method: "POST",
    headers: {
      // TODO: Add headers
    },
    body: {
      // TODO: Add body
      // file: fileToUpload (something like this?)
    },
  }).then((response) => {
    console.log(response);
  });
});

/**
 * Display the security statement overlay
 */
function hideOverlay() {
  document.getElementById("security-statement-overlay").style.display = "none";
}

/**
 * Hide the security statement overlay
 
 */
function showOverlay() {
  document.getElementById("security-statement-overlay").style.display = "block";
}
