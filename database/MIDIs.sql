CREATE TABLE MIDIs (
    midi_id INT AUTO_INCREMENT PRIMARY KEY,
    recording_id INT,
    midi_data LONGBLOB,
    FOREIGN KEY (recording_id) REFERENCES Recordings(recording_id)
);

