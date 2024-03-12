import React, { useState, useEffect } from "react";

const SecurityStatement = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const closePopup = () => setIsVisible(false);

    if (isVisible) {
      window.addEventListener("click", closePopup);
    }
    // console.log(isVisible);

    return () => window.removeEventListener("click", closePopup);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      id="security-statement-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "2rem",
          paddingTop: "1rem",
          background: "white",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 id="security-statement-heading">Security Statement</h1>
        <p id="security-statement-body">
          • Our system will only record audio in between when the user has
          clicked the start and stop recording button. <br />
          <br />
          • Our system will only store the MIDI file converted from audio
          recordings. <br />
          <br />
          • The system will state that the audio recordings will only be used
          for converting into the MIDI file. <br />
          <br />
          • MIDI files will be stored in the database and open for all users to
          see. <br />
          <br />
          • The system will not save audio recordings because users may want to
          avoid having their voice being recorded and stored on the system.
          <br />
          <br />• Our system will be vulnerable to denial-of-service attacks.
        </p>
      </div>
    </div>
  );
};

export default SecurityStatement;
