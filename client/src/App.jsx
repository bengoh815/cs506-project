/******************************************************************************
 * Filename: App.jsx
 * Purpose:  Main application file for the Melody Mapper application.
 * Author:   Victor Nguyen & Don Ma
 *
 * Description:
 * [Detailed description of the contents and functionality of the file.]
 * This file contains the main application component that renders the entire
 * application. It imports and renders the following components:
 * - SecurityStatement: A component that displays a security statement to the user.
 * - RecordButton: A component that allows the user to record audio.
 * - FileUpload: A component that allows the user to upload an audio file.
 * - ConversionHistory: A component that displays the user's conversion history.
 *
 * Usage:
 * To use this file, import it into the main index.js file and render it
 * using the ReactDOM.render() method.
 *
 * Notes:
 * [Any additional notes, considerations, or important information
 * about the file that may be relevant to developers or users.]
 *
 ******************************************************************************/

import React from "react";
import "./App.css";
import SecurityStatement from "./components/security_statement/SecurityStatement";
import AppLogo from "./components/logo/AppLogo";
import RecordAudio from "./components/record/RecordAudio";
import FileUpload from "./components/upload/FileUpload";
import ConversionHistory from "./components/conversion_history/ConversionHistory";

function App() {
  return (
    <div className="App">
      <SecurityStatement />
      <AppLogo />
      <RecordAudio />
      <FileUpload />
      <ConversionHistory />
    </div>
  );
}

export default App;
