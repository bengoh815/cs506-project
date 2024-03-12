import React from "react";
import "./App.css";
import SecurityStatement from "./basic_ui_component/SecurityStatements";
import RecordButton from "./basic_ui_component/RecordButton";
import FileUpload from "./basic_ui_component/FileUpload";
import ConversionHistory from "./basic_ui_component/ConversionHistory";
import logo from "./images/melody_logo.png";

function App() {
  return (
    <div className="App">
      <SecurityStatement />
      <img
        id="logo"
        className="melody_logo"
        src={logo}
        alt="Melody Mapper Logo"
        height="64"
      />
      <RecordButton />
      <FileUpload />
      <ConversionHistory />
    </div>
  );
}

export default App;
