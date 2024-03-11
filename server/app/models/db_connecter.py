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
from sqlalchemy.orm import sessionmaker
from app.connection_string import MYSQL_CONNECTION_STRING


class DBConnecter:
    def __init__(self):
        self.engine = create_engine(MYSQL_CONNECTION_STRING)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

    def get_session(self):
        return self.session()

    def close(self):
        if self.session:
            self.session.close()
            self.engine.dispose()

    def query(self, queryString):
        with self.engine.connect() as conn:
            results = conn.execute(queryString)

        return results
