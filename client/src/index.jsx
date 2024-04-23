/******************************************************************************
 * Filename: index.jsx
 * Purpose:  Main application file for the Melody Mapper application.
 * Author:   Victor Nguyen & Don Ma
 *
 * Description:
 * This file contains the main application component that renders the entire
 * application. It imports and renders the App component.
 *
 ******************************************************************************/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
