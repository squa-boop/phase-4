from flask import Blueprint, request, jsonify
from models import db, Users
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

# Create the auth blueprint
auth_bp = Blueprint("auth_bp", __name__)

# User Login
@auth_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()

    # Ensure email and password are provided
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required!"}), 400

    # Find the user by email
    user = Users.query.filter_by(email=data['email']).first()

    # Check if user exists and password matches
    if user and check_password_hash(user.password, data['password']):
        # Create JWT token for the logged-in user
        access_token = create_access_token(identity=user.user_id)  # Use user.user_id as the identity
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "user_id": user.user_id,
                "email": user.email,
                "username": user.username,
                "role": user.role
            }
        }), 200

    # If the credentials are invalid
    return jsonify({"message": "Invalid email or password!"}), 401

# Fetch current user data
@auth_bp.route('/current_user', methods=['GET'])
@jwt_required()  # Protect the route
def current_user():
    current_user_id = get_jwt_identity()  # Get the user_id from the JWT token

    # Find the user by user_id
    user = Users.query.get(current_user_id)

    if user:
        # Return the user data
        return jsonify({
            "user_id": user.user_id,
            "email": user.email,
            "username": user.username,
            "role": user.role
        }), 200
    else:
        return jsonify({"message": "User not found!"}), 404

# Protect a route to ensure that the user is logged in
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()  # Protect the route
def protected():
    current_user_id = get_jwt_identity()
    return jsonify({
        "message": f"Hello, user {current_user_id}. You are authorized to access this route."
    }), 200