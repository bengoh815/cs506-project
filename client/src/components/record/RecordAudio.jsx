/******************************************************************************
 * Filename: RecordButton.jsx
 * Purpose:  A component that allows the user to record audio.
 * Author:   Victor Nguyen & Don Ma
 *
 * Description:
 * This file contains the RecordButton component that allows the user to record
 * audio. The component displays a button that the user can click to start and
 * stop recording audio. The recorded audio is displayed to the user once the
 * recording has stopped and can be played back and downloaded.
 *
 * Usage:
 * To use this component, import it into the desired file and render it.
 *
 ******************************************************************************/

import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./RecordAudio.css";

const RecordButton = () => {
  // State to store whether the user is currently recording or not
  const [isRecording, setIsRecording] = useState(false);

  // State to store the MediaRecorder object
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // State to store the recorded audio
  const [recordedAudio, setRecordedAudio] = useState(null);

  // State to store the stream
  const streamRef = useRef(null);

  // State to store the label of the record button
  const [recordButtonLabel, setRecordButtonLabel] = useState("Start Recording");

  /**
   * Requests access to the user's microphone. If access is granted, the MediaRecorder object is created and the recording starts.
   */
  const startRecording = () => {
    if (!navigator.mediaDevices) {
      console.error("User media not available");
      return;
    }

    // Reset the recorded audio
    setRecordedAudio(null);
    setRecordButtonLabel("Stop Recording");

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream; // Assign the stream to the ref
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();
        setIsRecording(true);

        recorder.ondataavailable = (e) => {
          // e.data contains the audio data

          // Create a new Blob object and create an object URL for it
          const blob = new Blob([e.data], { type: "audio/webm" });
          const url = URL.createObjectURL(blob);

          setRecordedAudio(url);
        };

        recorder.onerror = (e) => console.error(e.error);
      })
      .catch((error) => {
        console.error(error);

        // Alert the user if they denied microphone access and prompt them to give permission in order to record audio
        if (error.name === "NotAllowedError") {
          alert(
            "Microphone permission denied. You need to give permission to record audio",
          );
        }
      });
  };

  /**
   * Stops the recording.
   */
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setRecordButtonLabel("Start Another Recording");
    }
  };

  /**
   * Uploads the recording webm file to the server to be processed.
   */
  const handleUpload = () => {
    // TODO: Implement
  };

  return (
    <div id="record-group" data-testid="record-group">
      {/* Heading */}
      <h3 id="record-heading" data-testid="record-heading">
        Record
      </h3>

      {/* Record Button */}
      <Button
        id="record-button"
        data-testid="record-button"
        onClick={isRecording ? stopRecording : startRecording}
        variant={isRecording ? "danger" : "success"}
      >
        {recordButtonLabel}
      </Button>

      {/* Upload Recorded Audio Button */}
      {recordedAudio && (
        <Button
          id="upload-button"
          data-testid="upload-button"
          onClick={handleUpload}
          variant="primary"
        >
          Upload Recording
        </Button>
      )}
    </div>
  );
};

export default RecordButton;
