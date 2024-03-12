################################################################################
# Filename: test_db_connection.py
# Purpose:  Tests for the db_connecter class
# Author:   Darren Seubert
#
# Description:
# File that runs test for db_connecter.py
#
# Notes:
#
###############################################################################

from app.models.db_connecter import DB_Connecter
import pytest
import sys

sys.path.append("../")


@pytest.fixture
def connecter():
    return DB_Connecter()


def test_connection(connecter):
    try:
        result_1 = connecter.read_DB("SELECT 1;")
        assert result_1 is not None
    except Exception as e:
        print(e)


def test_read(connecter):
    try:
        result_2 = connecter.readDB("SELECT * FROM Users;")
        expected_2 = [
            (1, "Test", "test@gmail.com"),
            (2, "Darren", "test@gmail.com"),
            (3, "Darren School", "dpseubert@wisc.edu"),
            (4, "Roshni", "rvenkat@wisc.edu"),
        ]
        assert result_2 == expected_2
    except Exception as e:
        print(e)


def test_write(connecter):
    try:
        connecter.modify_DB(
            'INSERT INTO Users (name, email) VALUES ("DEL ME", "delme@gmail.com")'
        )
        expected_3 = [
            (1, "Test", "test@gmail.com"),
            (2, "Darren", "test@gmail.com"),
            (3, "Darren School", "dpseubert@wisc.edu"),
            (4, "Roshni", "rvenkat@wisc.edu"),
            (5, "DEL ME", "delme@gmail.com"),
        ]
        assert connecter.readDB("SELECT * FROM Users;") == expected_3
    except Exception as e:
        print(e)


def test_delete():
    try:
        connecter.modify_DB('DELETE FROM Users WHERE name="DEL ME";')
        expected_4 = [
            (1, "Test", "test@gmail.com"),
            (2, "Darren", "test@gmail.com"),
            (3, "Darren School", "dpseubert@wisc.edu"),
            (4, "Roshni", "rvenkat@wisc.edu"),
        ]
        assert connecter.readDB("SELECT * FROM Users;") == expected_4
    except Exception as e:
        print(e)
