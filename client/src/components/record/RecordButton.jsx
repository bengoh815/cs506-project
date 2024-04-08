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

const RecordButton = () => {
  // State to store the MediaRecorder object
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // State to store the recorded audio
  const [isRecording, setIsRecording] = useState(false);

  // State to store the recorded audio
  const [recordedAudio, setRecordedAudio] = useState(null);

  // Add a useRef hook to keep a reference to the stream
  const streamRef = useRef(null);

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
          // You can create a new Blob object and create an object URL for it
          const url = URL.createObjectURL(e.data);
          console.log(url);

          setRecordedAudio(e.data);
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
      setIsRecording(false);
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div id="record" data-testid="record">
      <h2 id="record-heading" data-testid="record-heading">
        Record
      </h2>
      <div style={{ display: "inline" }}>
        <input
          type="button"
          id="record-file-input"
          data-testid="record-file-input"
          value={isRecording ? "Stop Recording" : "Start Recording"}
          onClick={isRecording ? stopRecording : startRecording}
        />
      </div>

      {recordedAudio && !isRecording && (
        <>
          <br />
          <br />
          <audio src={URL.createObjectURL(recordedAudio)} controls />
        </>
      )}
    </div>
  );
};

export default RecordButton;
