import downloadMidi from "../../utils/downloadMidi";

const FileDownload = ({ data }) => {
  // Data is expecting to be a JSON and have midi_id field

  const handleClick = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/v1/midis/${data.midi_id}`)
      .then((response) => response.json())
      .then((data) => {
        const midiData = data.midi_data; // base64 encoded MIDI data
        const filename = data.title + ".mid"; // Generate a file name

        // Call download function
        downloadMidi(midiData, filename);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return <button onClick={handleClick}>download midi</button>;
};

export default FileDownload;
