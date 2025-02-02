from flask import Blueprint, request, jsonify
from models import db, Users
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint("user_bp", __name__)

# Create User (Register)
@user_bp.route("/users", methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'attendee')  # Default to 'attendee' if role is not specified

    # Validate required fields
    if not username or not email or not role or not password:
        return jsonify({"msg": "Missing fields"}), 400

    # Check if the username or email already exists
    check_username = Users.query.filter_by(username=username).first()
    check_email = Users.query.filter_by(email=email).first()
    
    if check_username:
        return jsonify({"msg": "Username already exists"}), 400
    if check_email:
        return jsonify({"msg": "Email already exists"}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)
    new_user = Users(username=username, email=email, role=role, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully",
        "user": {
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role
        }
    }), 201

# # User Login (JWT Authentication)
# @user_bp.route("/login", methods=['POST'])
# def login_user():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     # Validate fields
#     if not email or not password:
#         return jsonify({"message": "Email and password are required"}), 400

#     # Find user by email
#     user = Users.query.filter_by(email=email).first()
#     if not user or not check_password_hash(user.password, password):
#         return jsonify({"message": "Invalid credentials"}), 401

#     # Create access token (JWT)
#     access_token = create_access_token(identity=user.user_id)

#     return jsonify({
#         "message": "Login successful",
#         "access_token": access_token
#     }), 200

# Fetch All Users
@user_bp.route("/users", methods=['GET'])
@jwt_required()  # Protect this endpoint with JWT
def fetch_users():
    users = Users.query.all()
    user_list = []

    for user in users:
        user_list.append({
            'id': user.user_id,
            'email': user.email,
            'username': user.username,
            'role': user.role,  # Include the user's role for clarity
            'events': [
                {
                    "id": event.event_id,
                    "title": event.title,
                    "description": event.description,
                    "event_date": event.date,
                    "location": event.location
                } for event in user.events
            ]
        })

    return jsonify(user_list)

# Fetch User by ID
@user_bp.route("/user/<int:user_id>", methods=['GET'])
@jwt_required()  # Protect this endpoint with JWT
def get_user(user_id):
    user = Users.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({
        "id": user.user_id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    }), 200

# Update User by ID
@user_bp.route('/user/<int:user_id>', methods=['PATCH'])
@jwt_required()  # Protect this endpoint with JWT
def update_user(user_id):
    data = request.get_json()
    user = Users.query.get(user_id)
    
    if not user:
        return jsonify({"message": "User not found"}), 404

    username = data.get('username', user.username)
    email = data.get('email', user.email)
    password = data.get('password', None)

    # Check if the new username or email already exists
    if username != user.username:
        check_username = Users.query.filter(Users.username == username, Users.user_id != user_id).first()
        if check_username:
            return jsonify({"message": "Username already exists"}), 400

    if email != user.email:
        check_email = Users.query.filter(Users.email == email, Users.user_id != user_id).first()
        if check_email:
            return jsonify({"message": "Email already exists"}), 400

    # Update fields if provided
    if username:
        user.username = username
    if email:
        user.email = email
    if password:
        user.password = generate_password_hash(password)

    db.session.commit()

    return jsonify({
        "message": "User updated successfully",
        "user": {
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }), 200

# Delete User by ID
@user_bp.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()  # Protect this endpoint with JWT
def delete_user(user_id):
    user = Users.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200
