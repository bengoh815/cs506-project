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

from app.models.db_connecter import DBConnecter
import pytest
import sys

sys.path.append("../")


@pytest.fixture
def connecter():
    return DBConnecter()


def test_connection(connecter):
    try:
        result = connecter.query("SELECT 1")
        assert result is not None
    finally:
        connecter.close()
