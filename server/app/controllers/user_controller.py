################################################################################
# Filename: user_controller.py
# Purpose:  Handles RESTful API routes for user operations
# Author:   Benjamin Goh
#
# Description:
# This module is responsible for defining and handling all RESTful API routes
# related to user operations in the application. It includes functions for
# creating, reading, updating, and deleting user data.
#
# Usage (Optional):
# This module is not intended to be run as a standalone script. Instead, it should
# be imported and used in conjunction with a Flask application. For example:
#
#     from user_controller import create_user, get_user
#     app.route('/users', methods=['POST'])(create_user)
#     app.route('/users/<int:user_id>', methods=['GET'])(get_user)
# Notes:
# Ensure that the required dependencies, such as Flask and any database
# libraries, are installed and properly configured in your environment.
################################################################################

from app.utils.status_codes import OK, CREATED, NO_CONTENT
from flask import jsonify


def get_all_users():
    """
    Retrieve a list of all users.

    Returns:
        tuple: A JSON list of users and the HTTP status code OK (200).
    """
    users = [{"id": 1, "name": "User1"}, {"id": 2, "name": "User2"}]
    return jsonify(users), OK


def get_user(user_id):
    """
    Retrieve a single user by its ID.

    Args:
        user_id (int): The ID of the user to retrieve.

    Returns:
        tuple: A JSON representation of the user and the HTTP status code OK (200).
    """
    user = {"id": user_id, "name": "UserName"}
    return jsonify(user), OK


def create_user():
    """
    Create a new user.

    Returns:
        tuple: A JSON representation of the newly created user and the HTTP status code CREATED (201).
    """
    new_user = {"id": 3, "name": "NewUser"}
    return jsonify(new_user), CREATED


def update_user(user_id):
    """
    Update an existing user.

    Args:
        user_id (int): The ID of the user to update.

    Returns:
        tuple: A JSON representation of the updated user and the HTTP status code OK (200).
    """
    updated_user = {"id": user_id, "name": "UpdatedUser"}
    return jsonify(updated_user), OK


def delete_user(user_id):
    """
    Delete a user.

    Args:
        user_id (int): The ID of the user to delete.

    Returns:
        tuple: A JSON message confirming the deletion of the user and the HTTP status code NO CONTENT (204).
    """
    return (
        jsonify({"message": f"User {user_id} deleted successfully"}),
        NO_CONTENT,
    )
