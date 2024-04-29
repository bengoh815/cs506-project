/******************************************************************************
 * Filename: downloadXml.js
 * Purpose:  Facilitates the download of musicxml files as provided in base64 format.
 * Author:   Benjamin Goh
 *
 * Description:
 * This module contains a function that converts a base64-encoded string into a Blob,
 * and then triggers a download of this blob as a file in the browser. The primary function
 * provided, `downloadXml`, takes a base64 string and a suggested filename, and prompts the
 * user to download the file.
 *
 * Usage:
 * Import the `downloadXml` function from this module and call it with the base64 string
 * and a filename to initiate a download:
 *
 * ```javascript
 * import downloadXml from './downloadXml';
 *
 * const base64String = "base64-encoded-Xml-data";
 * const filename = "example.Xml";
 * downloadXml(base64String, filename);
 * ```
 *
 * Notes:
 * - This function assumes that the base64 string is properly formatted and corresponds to
 *   a valid musicxml file content.
 * - The MIME type is hardcoded as 'application/vnd.recordare.musicxml', appropriate only for musicxml files. If the
 *   function is to be used for different file types, further modification is required to
 *   accept MIME types as a parameter.
 ******************************************************************************/

function base64ToBlob(base64, mimeType) {
  // Decode the base64 string to binary data
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create a blob with the correct MIME type
  return new Blob([byteArray], { type: mimeType });
}

export default function downloadXml(dataBase64, filename) {
  // Assume the MIME type is 'application/vnd.recordare.musicxml'
  const blob = base64ToBlob(dataBase64, "application/vnd.recordare.musicxml");

  // Create a link element, use it for downloading the blob, and remove it when done
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename; // Set the file name for the download

  // Append the link, trigger the download, then remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
