################################################################################
# Filename: recording_model.py
# Purpose:  Define the Recording model for representing recording file data in the database.
# Author:   Benjamin Goh
#
# Description:
# This file contains the definition of the Recording class, which is used as a model
# to represent recording file data in the application's database. The class includes
# attributes corresponding to the recording file's properties, such as its ID and name.
#
# Usage (Optional):
# TBD
#
# Notes:
# The Recording class should be integrated with an ORM (Object-Relational Mapping)
# tool like SQLAlchemy to facilitate database interactions. Additional attributes
# and methods may be added to the class as needed to support the application's
# functionality.
#
###############################################################################


class Recording:
    id = 5
    name = "something"
    # Other attributes...
