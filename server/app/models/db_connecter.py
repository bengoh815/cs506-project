################################################################################
# Filename: db_connecter.py
# Purpose:  Class to connect the Back End and MYSQL DB
# Author:   Darren Seubert
#
# Description:
# Using SQLAlchemy, connect to the Database and be able to run queries against it
#
# Notes:
# Must install sqlalchemy and mysql-connector-python
#
###############################################################################

from sqlalchemy import create_engine
from sqlalchemy import text
from app.connection_string import MYSQL_CONNECTION_STRING


class DB_Connecter:
    def __init__(self, connection_stream):
        self.engine = create_engine(connection_stream)

    def modify_DB(self, modifyString):
        """
        Method to insert or delete from the database via a query string.

        Args:
            modifyString (string): String of query to be run.
        """
        with self.engine.connect() as conn:
            conn.execute(text(modifyString))
            conn.commit()

    def read_DB(self, readString):
        """
        Method to read from the database via a query string.

        Args:
            readString (string): String of query to be run.

        Returns:
            list: The results of the query.
        """
        with self.engine.connect() as conn:
            results = list(conn.execute(text(readString)))

        return results
