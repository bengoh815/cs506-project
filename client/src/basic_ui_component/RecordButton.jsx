import React from "react";

const RecordButton = () => {
  const startRecording = () => {
    console.log("Recording...");
    // Implement recording functionality
  };

  return (
    <div id="record">
      <h2 id="record-heading">Record</h2>
      <input
        type="button"
        id="record-file-input"
        value="Start Recording"
        onClick={startRecording}
      />
    </div>
  );
};

export default RecordButton;
