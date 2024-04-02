/*
# Filename: init.sql
# Purpose: create and initialize the database
# Author: Roshni Venkat
#
# Description:
# This file contains the script to create and initialize MelodyMapper database.
#
# Usage (Optional):
# [Instructions or examples demonstrating how to use the code in this file.
# Include any dependencies or prerequisites required for proper usage.]
#
# Notes:
# [Any additional notes, considerations, or important information
# about the file that may be relevant to developers or users.]
#
*/

CREATE DATABASE IF NOT EXISTS mp_database;
USE mp_database;

/*
Creates the Users table in the database
Attributes:
    user_id(integer): the user id
    name(string): the user name
    email(string): the user email
*/
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

/*
Creates the Recordings table in the database
Attributes:
    recording_id(integer): the recording id
    user_id(integer): the user id
    name(String): the user name
*/
CREATE TABLE IF NOT EXISTS Recordings (
    recording_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

/*
Creates the Users table in the database
Attributes:
    midi_id(integer): the user id
    recording_id(integer): the recording id
    midi_data (bytearray): the midi data
*/
CREATE TABLE IF NOT EXISTS MIDIs (
    midi_id INT AUTO_INCREMENT PRIMARY KEY,
    recording_id INT,
    midi_data LONGBLOB,
    FOREIGN KEY (recording_id) REFERENCES Recordings(recording_id)
);
