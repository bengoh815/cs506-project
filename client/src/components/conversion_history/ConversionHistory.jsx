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
  { 'fileName': 'song1.mid', 'author': 'Fiona', 'date': '2024-03-10', 'size': '3.4 MB' },
  { 'fileName': 'song2.mid', 'author': 'George', 'date': '2024-03-11', 'size': '3.5 MB' },
  { 'fileName': 'song3.mid', 'author': 'George', 'date': '2024-03-12', 'size': '5.4 MB' },
  { 'fileName': 'song4.mid', 'author': 'Hannah', 'date': '2024-03-13', 'size': '35.41 MB' },
  { 'fileName': 'song5.mid', 'author': 'Julia', 'date': '2024-03-14', 'size': '9.4 MB' },
  { 'fileName': 'song6.mid', 'author': 'Ethan', 'date': '2024-03-15', 'size': '13.0 MB' },
  { 'fileName': 'song7.mid', 'author': 'George', 'date': '2024-03-16', 'size': '31.5 MB' },
  { 'fileName': 'song8.mid', 'author': 'George', 'date': '2024-03-17', 'size': '3.4 MB' },
  { 'fileName': 'song9.mid', 'author': 'Fiona', 'date': '2024-03-18', 'size': '3.9 MB' },
  { 'fileName': 'song10.mid', 'author': 'George', 'date': '2024-03-19', 'size': '1.4 MB' },
  { 'fileName': 'song11.mid', 'author': 'Diana', 'date': '2024-03-20', 'size': '254 MB' },
  { 'fileName': 'song12.mid', 'author': 'Alice', 'date': '2024-03-21', 'size': '3.0 MB' },
  { 'fileName': 'song13.mid', 'author': 'Bob', 'date': '2024-03-22', 'size': '0.9 MB' },
];

const ConversionHistory = () => {
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [sortingCriteria, setSortingCriteria] = useState('fileName'); // default is fileName
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8765/api/v1/midis", {
      method: "GET",
      headers: {

      },
    })
      .then((response) => {
        console.log("Fetching conversion history from the backend...");
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
    } else if (sortingCriteria === 'size') {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      return isAscending ? sizeA - sizeB : sizeB - sizeA;
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
      setIsAscending(!isAscending);
    } else {
      setSortingCriteria(newCriteria);
      setIsAscending(true);
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
              <th onClick={() => handleSort('size')} className="sortable">
                Size{getSortingIndicator('size')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.fileName}</td>
                <td>{entry.author}</td>
                <td>{entry.date}</td>
                <td>{entry.size}</td>
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
          activeClassName={"pagination__link--active"}
          disabledClassName={"pagination__link--disabled"}
        />
      </div>
    </div>
  );
};

export default ConversionHistory;
