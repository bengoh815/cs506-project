################################################################################
# Filename: user_model.py
# Purpose:  Define the User model for representing user data in the database.
# Author:   Benjamin Goh
#
# Description:
# This file contains the definition of the User class, which is used as a model
# to represent user data in the application's database. The class includes
# attributes corresponding to the user's properties, such as its ID and name.
#
# Usage (Optional):
# TBD
#
# Notes:
# The User class should be integrated with an ORM (Object-Relational Mapping)
# tool like SQLAlchemy to facilitate database interactions. Additional attributes
# and methods may be added to the class as needed to support the application's
# functionality.
#
###############################################################################


from app.database import db


class User(db.Model):
    __tablename__ = "Users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
