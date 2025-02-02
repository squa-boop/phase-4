# views/rsvp.py
from flask import Blueprint, request, jsonify
from models import db, RSVP, Event
from flask_jwt_extended import jwt_required, get_jwt_identity

rsvp_bp = Blueprint("rsvp_bp", __name__)

@rsvp_bp.route("/rsvp", methods=['POST'])
@jwt_required()
def rsvp_event():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    event_id = data["event_id"]
    
    # Get the event using the event_id
    event = Event.query.get_or_404(event_id)  # Get event by event_id
    
    # Check if an RSVP already exists for the current user and event
    rsvp = RSVP.query.filter_by(event_id=event_id, user_id=current_user_id).first()
    
    # If RSVP exists, update the status
    if rsvp:
        rsvp.status = data['status']
    else:
        # Create new RSVP
        rsvp = RSVP(user_id=current_user_id, status=data['status'], event_id=event_id)
    
    # Save the RSVP to the database
    db.session.add(rsvp)
    db.session.commit()
    
    return jsonify({"message": "RSVP updated successfully!"}), 200

# track

@rsvp_bp.route('/<int:event_id>', methods=['GET'])
@jwt_required()
def track_rsvps(event_id):
    print(f"Looking for event_id: {event_id}")
    event = Event.query.get_or_404(event_id)

    if event.organizer_id != get_jwt_identity():
        return jsonify({"message": "Unauthorized"}), 403

    rsvps = RSVP.query.filter_by(event_id=event_id).all()

    return jsonify([{
        "user_id": rsvp.user_id,
        "status": rsvp.status
    } for rsvp in rsvps]), 200
