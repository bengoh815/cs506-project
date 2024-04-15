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

import React, { useEffect, useState } from "react";
import "./ConversionHistory.css";
import ReactPaginate from "react-paginate";

// Mock data for conversion history
const mockConversionHistoryData = [
  { 'fileName': 'song1.mid', 'author': 'Fiona', 'date': '2024-03-10' },
  { 'fileName': 'song2.mid', 'author': 'George', 'date': '2024-03-11' },
  { 'fileName': 'song3.mid', 'author': 'George', 'date': '2024-03-12' },
  { 'fileName': 'song4.mid', 'author': 'Hannah', 'date': '2024-03-13' },
  { 'fileName': 'song5.mid', 'author': 'Julia', 'date': '2024-03-14' },
  { 'fileName': 'song6.mid', 'author': 'Ethan', 'date': '2024-03-15' },
  { 'fileName': 'song7.mid', 'author': 'George', 'date': '2024-03-16' },
  { 'fileName': 'song8.mid', 'author': 'George', 'date': '2024-03-17' },
  { 'fileName': 'song9.mid', 'author': 'Fiona', 'date': '2024-03-18' },
  { 'fileName': 'song10.mid', 'author': 'George', 'date': '2024-03-19' },
  { 'fileName': 'song11.mid', 'author': 'Diana', 'date': '2024-03-20' },
  { 'fileName': 'song12.mid', 'author': 'Alice', 'date': '2024-03-21' },
  { 'fileName': 'song13.mid', 'author': 'Bob', 'date': '2024-03-22' },
  { 'fileName': 'song14.mid', 'author': 'George', 'date': '2024-03-23' },
  { 'fileName': 'song15.mid', 'author': 'Hannah', 'date': '2024-03-24' },
  { 'fileName': 'song16.mid', 'author': 'Ethan', 'date': '2024-03-25' },
  { 'fileName': 'song17.mid', 'author': 'Julia', 'date': '2024-03-26' },
  { 'fileName': 'song18.mid', 'author': 'Bob', 'date': '2024-03-27' },
  { 'fileName': 'song19.mid', 'author': 'Ethan', 'date': '2024-03-28' },
  { 'fileName': 'song20.mid', 'author': 'George', 'date': '2024-03-29' }];

const ConversionHistory = () => {
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [sortingCriteria, setSortingCriteria] = useState('fileName'); // default is fileName
  const [isAscending, setIsAscending] = useState(true);

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

  // Sorting function
  const sortItems = (a, b) => {
    if (sortingCriteria === 'fileName') {
      return isAscending ? a.fileName.localeCompare(b.fileName) : b.fileName.localeCompare(a.fileName);
    } else if (sortingCriteria === 'author') {
      return isAscending ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
    } else if (sortingCriteria === 'date') {
      return isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    }
  };

  mockConversionHistoryData.sort(sortItems);

  // Calculate the current items to display
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockConversionHistoryData.slice(indexOfFirstItem, indexOfLastItem);


  // Change page handler for ReactPaginate
  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handler to update sorting criteria and direction
  const handleSort = (newCriteria) => {
    if (sortingCriteria === newCriteria) {
      setIsAscending(!isAscending); // Toggle sorting direction if the same criteria is clicked
    } else {
      setSortingCriteria(newCriteria);
      setIsAscending(true); // Default to ascending when criteria changes
    }
  };

  const getSortingIndicator = (columnName) => {
    if (sortingCriteria === columnName) {
      return isAscending ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="conversion-history-container">
      <div id="conversion-history">
        <h2 id="conversion-history-heading">Conversion History</h2>
        <table id="conversion-history-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('fileName')} className="sortable">
                File{getSortingIndicator('fileName')}
              </th>
              <th onClick={() => handleSort('author')} className="sortable">
                Author{getSortingIndicator('author')}
              </th>
              <th onClick={() => handleSort('date')} className="sortable">
                Date{getSortingIndicator('date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.fileName}</td>
                <td>{entry.author}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(mockConversionHistoryData.length / itemsPerPage)}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
        />
      </div>
    </div>
  );
};

export default ConversionHistory;
