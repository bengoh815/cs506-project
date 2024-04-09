/******************************************************************************
 * Filename: ConversionHistory.jsx
 * Purpose:  A component that displays the user's file conversion history.
 * Author:   Victor Nguyen & Don Ma
 *
 * Description:
 * This file contains the ConversionHistory component that displays the user's
 * file conversion history. The component fetches the user's conversion history
 * from the backend and displays it in a table. The table contains the file name,
 * author, and date of each conversion. The component is designed to be displayed
 * as part of the main application content.
 *
 * Usage:
 * To use this component, simply import it into the desired file and render it.
 *
 * Notes:
 * [Any additional notes, considerations, or important information
 * about the file that may be relevant to developers or users.]
 *
 ******************************************************************************/

import React from "react";
import "./ConversionHistory.css";
import { useEffect, useState } from "react";

// Mock data for conversion history
const mockConversionHistoryData = [
  { fileName: "song1.mid", author: "Alice", date: "2024-03-10" },
  { fileName: "tune2.mid", author: "Bob", date: "2024-03-11" },
  { fileName: "melody3.mid", author: "Charlie", date: "2024-03-12" },
];

const ConversionHistory = () => {
  const [convertedFiles, setConvertedFiles] = useState([]);

  useEffect(() => {
    // Fetch the conversion history from the backend
    fetch("some/url", {
      method: "GET",
      headers: {
        // TODO: Add headers
      },
    })
      .then((response) => {
        console.log("Fetching conversion history from the backend...");
        // return response.json();
      })
      .then((data) => {
        setConvertedFiles(data);
        console.log(convertedFiles);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="conversion-history-container">
      <div id="conversion-history">
        <h3 id="conversion-history-heading">Conversion History</h3>
        <table id="conversion-history-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mockConversionHistoryData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.fileName}</td>
                <td>{entry.author}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConversionHistory;
