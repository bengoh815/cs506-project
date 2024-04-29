/******************************************************************************
 * title: ConversionHistory.jsx
 * Purpose:  A component that displays the user's file conversion history.
 * name:   Victor Nguyen & Don Ma
 *
 * Description:
 * This file contains the ConversionHistory component that displays the user's
 * file conversion history. The component fetches the user's conversion history
 * from the backend and displays it in a table. The table contains the file name,
 * name, and date of each conversion. The component is designed to be displayed
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
  { "title": "song1.midi", "name": "Fiona", "date": "2024-03-10", "email": "fiona@email.com" },
  { "title": "song2.midi", "name": "George", "date": "2024-03-11", "email": "george@email.com" },
  { "title": "song3.midi", "name": "George", "date": "2024-03-12", "email": "george@email.com" },
  { "title": "song4.midi", "name": "Hannah", "date": "2024-03-13", "email": "hannah@email.com" },
  { "title": "song5.midi", "name": "Julia", "date": "2024-03-14", "email": "julia@email.com" },
  { "title": "song6.midi", "name": "Ethan", "date": "2024-03-15", "email": "ethan@email.com" },
  { "title": "song7.midi", "name": "George", "date": "2024-03-16", "email": "george@email.com" },
  { "title": "song8.midi", "name": "George", "date": "2024-03-17", "email": "george@email.com" },
  { "title": "song9.midi", "name": "Fiona", "date": "2024-03-18", "email": "fiona@email.com" },
  { "title": "song10.midi", "name": "George", "date": "2024-03-19", "email": "george@email.com" },
  { "title": "song11.midi", "name": "Diana", "date": "2024-03-20", "email": "diana@email.com" },
  { "title": "song12.midi", "name": "Alice", "date": "2024-03-21", "email": "alice@email.com" },
  { "title": "song13.midi", "name": "Bob", "date": "2024-03-22", "email": "bob@email.com" }
];

/**
 * A component that displays the user's file conversion history.
 *
 * @returns {JSX.Element} ConversionHistory component.
 */
const ConversionHistory = () => {
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [sortingCriteria, setSortingCriteria] = useState('title'); // default is title
  const [isAscending, setIsAscending] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL
  const [searchQuery, setSearchQuery] = useState("");

  // For testing purpose only
  useEffect(() => {
    setConvertedFiles(mockConversionHistoryData);
  })

  useEffect(() => {
    console.log(`${apiUrl}/api/v1/midis`)
    fetch(`${apiUrl}/api/v1/midis`, {
      method: "GET",
      headers: {

      },
    })
      .then((response) => {
        console.log("Fetching conversion history from the backend...");
        return response.json();
      })
      .then((data) => {
        // setConvertedFiles(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  /**
   * Handle downloading a MIDI file.
   *
   * @param {string} title - The name of the file to download.
   */
  const handleDownloadMIDI = (title) => {
    window.alert('Download initiated for ' + title);
    fetch(`${apiUrl}/api/v1/download/converted/${title}`, {
      method: "GET",
      headers: {
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', title); // Set the file name
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  /**
   * Handle downloading a PDF file.
   *
   * @param {string} title - The name of the file to download.
   */
  const handleDownloadPDF = (title) => {
    window.alert('Download initiated for ' + title);
    fetch(`${apiUrl}/api/v1/download/converted/${title}`, {
      method: "GET",
      headers: {
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', title); // Set the file name
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  /**
   * Sort items based on given criteria and direction.
   *
   * @param {Object} a - The first item to compare.
   * @param {Object} b - The second item to compare.
   * @returns {number} Result of the comparison.
   */
  const sortItems = (a, b) => {
    if (sortingCriteria === 'title') {
      return isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortingCriteria === 'name') {
      return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortingCriteria === 'date') {
      return isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    } else if (sortingCriteria === 'email') {
      return isAscending ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    } else if (sortingCriteria === 'size') {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      return isAscending ? sizeA - sizeB : sizeB - sizeA;
    }
  };
  // setConvertedFiles(mockConversionHistoryData);
  convertedFiles.sort(sortItems);

  // Calculate the current items to display
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = convertedFiles.slice(indexOfFirstItem, indexOfLastItem);


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

  /**
   * Get sorting indicator based on the given column name.
   *
   * @param {string} columnName - The name of the column.
   * @returns {string} Sorting indicator.
   */
  const getSortingIndicator = (columnName) => {
    if (sortingCriteria === columnName) {
      return isAscending ? ' ▲' : ' ▼';
    }
    return '';
  };

  /**
   * Get sorting indicator based on the given column name.
   *
   * @param {string} columnName - The name of the column.
   * @returns {string} Sorting indicator.
   */
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Filter items based on the search query.
   * Convert files based on searchQuery
   *
   * @param {Object} item - The item to check for search query match.
   * @returns {boolean} Whether the item matches the search query.
   */
  const filteredItems = convertedFiles.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="conversion-history-container">
      <div id="conversion-history">
        <h2 id="conversion-history-heading">Conversion History</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <table id="conversion-history-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} className="sortable">
                File{getSortingIndicator('title')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name{getSortingIndicator('name')}
              </th>
              <th onClick={() => handleSort('date')} className="sortable">
                Email{getSortingIndicator('date')}
              </th>
              <th onClick={() => handleSort('email')} className="sortable">
                Date{getSortingIndicator('email')}
              </th>
              <th>Downlaod</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.title}</td>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.date}</td>
                <td>
                  <button onClick={() => handleDownloadPDF(entry.title)}>Download PDF</button>
                  <button onClick={() => handleDownloadMIDI(entry.title)}>Download MIDI</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(convertedFiles.length / itemsPerPage)}
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
