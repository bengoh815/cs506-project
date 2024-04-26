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

export default function downloadMidi(dataBase64, filename) {
  // Assume the MIME type is 'audio/midi'
  const blob = base64ToBlob(dataBase64, "audio/midi");

  // Create a link element, use it for downloading the blob, and remove it when done
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename; // Set the file name for the download

  // Append the link, trigger the download, then remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
