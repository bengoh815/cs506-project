################################################################################
# Filename: test_db.py
# Purpose:  file to test whether the database initilization script is working 
#           as expected
# Author:   Roshni Venkat
#
# Description:
# This file contains the tests for checking whether the database is created and 
# initialized correctly.
#
# Usage (Optional):
# [Instructions or examples demonstrating how to use the code in this file.
# Include any dependencies or prerequisites required for proper usage.]
#
# Notes:
# [Any additional notes, considerations, or important information
# about the file that may be relevant to developers or users.]
#
###############################################################################

# imports
import pytest
import sys
# update the Path to allow the app directory to be accessed
from pathlib import Path
current_dir = Path(__file__).parent
parent_dir = current_dir.parent
sys.path.append(str(parent_dir))
from app.models.db_connecter import DB_Connecter

@pytest.fixture
def conn():
    """
    Function to connect to the database

    Args:
        None

    Returns:
        An instance of the connector to the database
    """
    return DB_Connecter()

def test_users_setup(conn):
    """
    Function to test whether the users table is successfully created

    Args:
       conn: instance of the DB_Connector class to connect to the database

    Returns:
        None
    """
    result = conn.read_DB("SHOW TABLES LIKE 'Users'")
    assert result is not None

def test_recordings_setup(conn):
    """
    Function to test whether the recordings table is successfully created

    Args:
       conn: instance of the DB_Connector class to connect to the database

    Returns:
        None
    """
    result = conn.read_DB("SHOW TABLES LIKE 'Recordings'")
    assert result is not None

def test_midis_setup(conn):
    """
    Function to test whether the MIDIs table is successfully created

    Args:
       conn: instance of the DB_Connector class to connect to the database

    Returns:
        None
    """
    result = conn.read_DB("SHOW TABLES LIKE 'MIDIs'")
    assert result is not None


def test_users_schema(conn):
    """
    Function to test whether the users table has the correct schema

    Args:
       conn: instance of the DB_Connector class to connect to the database

    Returns:
        None
    """
    try:
        result = conn.read_DB("DESCRIBE Users;")
        expected_columns = [
            ("user_id", "int", "NO", "PRI", None, "auto_increment"),
            ("name", "varchar(255)", "YES", "", None, ""),
            ("email", "varchar(255)", "YES", "", None, ""),
        ]
        assert result == expected_columns
    except Exception as e:
        print(e)


def test_recordings_schema(conn):
    """
    Function to test whether the recordings table has the correct schema

    Args:
       conn: instance of the DB_Connector class to connect to the database

    Returns:
        None
    """
    try:
        result = conn.read_DB("DESCRIBE Recordings;")
        expected_columns = [
            ("recording_id", "int", "NO", "PRI", None, "auto_increment"),
            ("user_id", "int", "YES", "", None, ""),
            ("name", "varchar(255)", "YES", "", None, ""),
        ]
        assert result == expected_columns
    except Exception as e:
        print(e)


def test_midis_schema(conn):
    """
    Function to test whether the MIDIs table has the correct schema

    Args:
       conn: instance of the DB_Connector class to connect to the database

    Returns:
        None
    """
    try:
        result = conn.read_DB("DESCRIBE MIDIs;")
        expected_columns = [
            ("midi_id", "int", "NO", "PRI", None, "auto_increment"),
            ("recording_id", "int", "YES", "", None, ""),
            ("midi_data", "longblob", "YES", "", None, ""),
        ]
        assert result == expected_columns
    except Exception as e:
        print(e)