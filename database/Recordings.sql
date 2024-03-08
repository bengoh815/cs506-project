CREATE TABLE Recordings (
    recording_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
